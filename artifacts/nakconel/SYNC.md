# Nakconel Bank — synced from nakconel-bank-2

This folder mirrors the production bank app.

| Repo | Role |
|------|------|
| **nakconel-bank-2** | Deploy target (Vercel) |
| **grove-moss-maple-pepper** / `artifacts/nakconel` | Workspace copy of the bank |

## Status
Synced from `nakconel-bank-2` main (schema, package, app shell, lib, domains partial, health API).

Large UI components (BankApp, BusinessView, SignupFlow, InternationalView) and remaining API routes should be taken from:
https://github.com/nakconelcompany-ai/nakconel-bank-2

**Never commit real DATABASE_URL or ENCRYPTION_KEY.**

Deploy only from **nakconel-bank-2**.
