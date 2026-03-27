# OCTR Dashboard Index

Six dashboards forming a closed performance loop.

```
DB-1  Executive Summary         ← "How are we doing overall?"
DB-2  Live Operations           ← "What needs attention RIGHT NOW?"
DB-3  Systems Intelligence      ← "Which systems are causing it?"
DB-4  Energy Hub & Metering     ← "How much energy and cost?"
DB-5  Optimization & Analytics  ← "Are our strategies working?"
DB-6  Engineering & Data        ← [INTERNAL USE ONLY]
```

## Dashboard Specs

| DB | Name | Route | Spec File | Sub-tabs |
|----|------|-------|-----------|----------|
| 1 | Executive Summary | `/` | [db1-executive-summary/SPEC.md](dashboards/db1-executive-summary/SPEC.md) | Overview, Carbon & ESG |
| 2 | Live Operations | `/operations` | [db2-live-operations/SPEC.md](dashboards/db2-live-operations/SPEC.md) | Single page |
| 3 | Systems Intelligence | `/systems` | [db3-systems-intelligence/SPEC.md](dashboards/db3-systems-intelligence/SPEC.md) | Water Side, Air Side, Zones, Equipment Health |
| 4 | Energy Hub & Metering | `/energy` | [db4-energy-hub/SPEC.md](dashboards/db4-energy-hub/SPEC.md) | Single page (expandable rows) |
| 5 | Optimization & Analytics | `/optimization` | [db5-optimization/SPEC.md](dashboards/db5-optimization/SPEC.md) | Strategy Scorecard, Analytics & Trends, M&V Baseline |
| 6 | Engineering & Data | `/engineering` | [db6-engineering/SPEC.md](dashboards/db6-engineering/SPEC.md) | FDD Register, Pipeline Health, DDC Deep Dive |

## The 20 OEH/AIRAH Strategies

These thread through DB-2 (faults mapped to them), DB-3 (panels organized by them), and DB-5 (scorecard tracking them).

| # | Strategy | Primary DB | DB-3 Sub-tab |
|---|----------|-----------|-------------|
| 1 | Optimum Start/Stop (OSS) | DB-5 | Air Side |
| 2 | Setpoints & Dead Bands | DB-5 | Zones |
| 3 | Master SAT Signal / Simultaneous H+C | DB-5 | Air Side |
| 4 | Chiller Staging Optimization | DB-5 | Water Side |
| 5 | Duct Static Pressure Reset (DSPR) | DB-5 | Air Side |
| 6 | Hot Water Reset | DB-5 | Air Side |
| 7 | Chilled Water Reset | DB-5 | Water Side |
| 8 | Condenser Water Reset | DB-5 | Water Side |
| 9 | EEV vs TXV Optimization | DB-5 | Equipment Health |
| 10 | Economy Cycle (Airside Economizer) | DB-5 | Air Side |
| 11 | Night Purge / Pre-Cooling | DB-5 | Air Side |
| 12 | Demand Controlled Ventilation (DCV) | DB-5 | Zones |
| 13 | (Reserved) | — | — |
| 14 | CHW Pump ΔP Reset | DB-5 | Water Side |
| 15 | VSD Optimization (Pumps) | DB-5 | Water Side |
| 16 | VSD Optimization (Fans) / Free Cooling | DB-5 | Water Side |
| 17–18 | (Reserved) | — | — |
| 19 | Filter Maintenance Optimization | DB-5 | Equipment Health |
| 20 | BMS Software & Controls Audit | DB-5 | Equipment Health |

## Build Order

1. Scaffold Next.js + deps + design tokens
2. Layout shell (sidebar, header, drawer)
3. Design system demo page
4. DB-1 Executive Summary
5. DB-2 Live Operations
6. DB-3 Systems Intelligence (Zones → Water → Air → Equipment)
7. DB-4 Energy Hub
8. DB-5 Optimization (Strategy Scorecard → M&V → Analytics)
9. DB-6 Engineering
10. 3D building upgrade (React Three Fiber)

## Working with Agents

Each dashboard has its own folder under `docs/dashboards/`. To work on a dashboard with an agent:

1. Reference that dashboard's `SPEC.md` for content and layout
2. Reference `docs/design-system/DESIGN-SYSTEM.md` for visual rules
3. Reference `docs/design-system/tokens.css` for CSS variables
4. Reference `docs/design-system/chart-theme.json` for ECharts theme
5. The agent builds only the pages/components for that dashboard
