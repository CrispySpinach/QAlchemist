# Technical Decisions

## 2026-10-24: Minimal workspace packages

Milestone 0 dan 1 hanya menyediakan package boundaries, shared TypeScript configuration, schema, serta sample validation. API, dashboard, AI, dan analyzer deterministic belum diimplementasikan agar scope tetap sesuai milestone.

## 2026-10-24: JSON Lines validation

File `timeline.jsonl`, `network.jsonl`, dan `state.jsonl` divalidasi sebagai record per baris lalu dipetakan ke `EvidenceBundle`. Ini mempertahankan format evidence yang streaming-friendly tanpa menambah format penyimpanan baru.
