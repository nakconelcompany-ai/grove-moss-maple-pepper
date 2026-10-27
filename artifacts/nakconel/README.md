# Nakconel Bank

Synced from [nakconel-bank-2](https://github.com/nakconelcompany-ai/nakconel-bank-2).

Phase 1–3 modular monolith — Next.js + Prisma + PostgreSQL (Neon).

## Quick start

```bash
cp .env.example .env   # set DATABASE_URL
npm install
npx prisma db push
npm run dev
```

Health: http://localhost:3000/api/v1/health

**Deploy target:** Vercel → repo `nakconel-bank-2` (not this workspace root).

**Never commit `.env`** — it contains secrets.
