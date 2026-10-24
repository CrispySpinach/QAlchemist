import { z } from "zod";

import { manifestSchema } from "./manifest.schema.js";

const timestamp = z.string().datetime({ offset: true });

export const environmentSchema = z.object({
  os: z.string().min(1),
  browser: z.string().min(1),
  locale: z.string().min(1),
  timezone: z.string().min(1),
  viewport: z.string().min(1),
});

export const timelineEventSchema = z.object({
  id: z.string().min(1),
  timestamp,
  type: z.string().min(1),
  message: z.string().min(1),
});

export const networkRequestSchema = z.object({
  id: z.string().min(1),
  timestamp,
  method: z.string().min(1),
  url: z.string().min(1),
  status: z.number().int().min(100).max(599),
  request_headers: z.record(z.string()),
  response_body: z.record(z.unknown()).optional(),
});

export const stateChangeSchema = z.object({
  id: z.string().min(1),
  timestamp,
  slice: z.string().min(1),
  from: z.string(),
  to: z.string(),
});

export const errorSchema = z.object({
  type: z.string().min(1),
  message: z.string().min(1),
  stack: z.string().min(1),
});

export const screenshotSchema = z.object({
  filename: z.string().min(1),
  captured_at: timestamp,
});

export const evidenceBundleSchema = z.object({
  manifest: manifestSchema,
  environment: environmentSchema,
  error: errorSchema,
  timeline: z.array(timelineEventSchema),
  network: z.array(networkRequestSchema),
  state: z.array(stateChangeSchema),
  screenshot: screenshotSchema.optional(),
});

export type EvidenceBundle = z.infer<typeof evidenceBundleSchema>;
export type Environment = z.infer<typeof environmentSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type NetworkRequest = z.infer<typeof networkRequestSchema>;
export type StateChange = z.infer<typeof stateChangeSchema>;
export type EvidenceError = z.infer<typeof errorSchema>;
