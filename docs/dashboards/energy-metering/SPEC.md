# Energy Metering — G Valley (offline bundle)

> **Goal**: provide a polished metering dashboard UX (tabs, range chips, KPIs, charts) for demo inspiration.  
> **Status**: the `/metering` route loads the interactive standalone bundle from `public/dashboards/energy-metering/` (kept in sync with `exports/energy-metering/standalone/`).  

## What exists (ready to share)

- **Offline interactive HTML** bundle in exports:
  - `exports/energy-metering/standalone/` (folder)
  - `exports/energy-metering/metering-standalone.zip` (zip)

This is what you can share with a demo builder who “has the numbers already” and wants the layout + chart grammar.

## In-app (demo)

- **Route**: `/metering` — iframe to `public/dashboards/energy-metering/index.html` (copy of the standalone folder).
- **Nav**: listed under **Dashboards** in the app sidebar.

## Full React port (optional)

Recommended Next.js (App Router) structure if you replace the iframe with native components:

- `apps/web/src/app/metering/page.tsx`
- `apps/web/src/app/metering/layout.tsx`
- `apps/web/src/components/metering/*`
- `apps/web/src/data/g-valley-metering.ts`
- `apps/web/src/lib/metering-chart-options.ts`, `apps/web/src/lib/metering-utils.ts`, `apps/web/src/lib/echarts-theme.ts`
- `apps/web/src/components/layout/DashboardChrome.tsx`

See restoration checklist:
- `docs/dashboards/energy-metering/RESTORE-IN-APP-CHECKLIST.md`

