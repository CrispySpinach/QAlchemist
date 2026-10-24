export const analyzerName = "deterministic-analyzer";

if (process.argv[1]?.endsWith("cli.ts")) {
  console.log(`${analyzerName} is ready`);
}
