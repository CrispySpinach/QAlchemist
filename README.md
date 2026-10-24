# AI Software QA & Engineering Assistant

TypeScript monorepo untuk MVP QA evidence bundle. Milestone 0 menyiapkan workspace, tooling, dan infrastruktur lokal; Milestone 1 menyediakan schema Zod dan sample evidence bundle tervalidasi.

## Menjalankan

```bash
corepack enable
pnpm install
pnpm build
pnpm lint
pnpm test
pnpm schemas:validate-samples
docker compose up -d
```

Arsitektur dan scope mengikuti [AGENT.md](./AGENT.md).
