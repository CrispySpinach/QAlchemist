import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  environmentSchema,
  errorSchema,
  manifestSchema,
  networkRequestSchema,
  stateChangeSchema,
  timelineEventSchema,
} from "@qa-assistant/schemas";

const bundleDirectory = resolve("samples/evidence-bundle");

async function readJson<T>(filename: string): Promise<T> {
  return JSON.parse(await readFile(resolve(bundleDirectory, filename), "utf8")) as T;
}

async function readJsonLines(filename: string): Promise<unknown[]> {
  const content = await readFile(resolve(bundleDirectory, filename), "utf8");
  return content
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as unknown);
}

async function main(): Promise<void> {
  const manifest = manifestSchema.parse(await readJson("manifest.json"));
  environmentSchema.parse(await readJson("environment.json"));
  errorSchema.parse(await readJson("error.json"));
  const timeline = await readJsonLines("timeline.jsonl");
  const network = await readJsonLines("network.jsonl");
  const state = await readJsonLines("state.jsonl");

  timeline.forEach((event) => timelineEventSchema.parse(event));
  network.forEach((request) => networkRequestSchema.parse(request));
  state.forEach((change) => stateChangeSchema.parse(change));
  const build = await readJson<Record<string, unknown>>("build.json");
  if (build.git_sha !== manifest.build.git_sha || build.version !== manifest.build.version) {
    throw new Error("build.json does not match manifest.build");
  }

  console.log(`Evidence bundle ${manifest.id} is valid.`);
}

void main();
