# Nakconel Bank — workspace sync

This folder mirrors the **Nakconel Bank** Next.js app.

| Repo | Role |
|------|------|
| [nakconel-bank-2](https://github.com/nakconelcompany-ai/nakconel-bank-2) | **Deploy target** (Vercel production) |
| [grove-moss-maple-pepper](https://github.com/nakconelcompany-ai/grove-moss-maple-pepper) | Grok project workspace (this repo) |

## Source of truth for production

Always deploy from **nakconel-bank-2** `main`.

Last aligned with bank-2 around commit `b5b7b95` (BankApp props + IconWorld + schema matching Neon).

Do **not** put real `DATABASE_URL` or `ENCRYPTION_KEY` in git — use Vercel env / local `.env` only.
