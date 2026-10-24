import { z } from "zod";

export const findingSchema = z.object({
  id: z.string().min(1),
  evidence_bundle_id: z.string().min(1),
  tenant_id: z.string().min(1),
  project_id: z.string().min(1),
  title: z.string().min(1),
  severity: z.enum(["P0", "P1", "P2", "P3"]),
  status: z.enum(["open", "triaged", "verified", "duplicate", "regression", "resolved", "ignored"]),
  confidence: z.number().min(0).max(1),
  report_markdown: z.string(),
  report_json: z.record(z.unknown()),
  created_at: z.string().datetime({ offset: true }),
});

export type Finding = z.infer<typeof findingSchema>;
