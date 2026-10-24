import { z } from "zod";

export const manifestSchema = z.object({
  schema_version: z.string().min(1),
  id: z.string().min(1),
  product: z.string().min(1),
  build: z.object({
    git_sha: z.string().min(1),
    version: z.string().min(1),
    sourcemap_id: z.string().min(1).optional(),
  }),
  captured_at: z.string().datetime({ offset: true }),
  source: z.enum(["sdk-web", "browser-extension", "manual-upload", "api"]),
  tester_notes: z.object({
    steps: z.array(z.string()).default([]),
    expected: z.string().optional(),
    actual: z.string().optional(),
  }),
  policy: z.object({
    redacted: z.boolean(),
    retention_days: z.number().int().positive(),
  }),
});

export type Manifest = z.infer<typeof manifestSchema>;
