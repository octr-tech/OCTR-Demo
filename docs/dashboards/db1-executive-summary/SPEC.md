# DB-1 — Executive Summary

> **Route**: `/` (home)
> **Persona**: Building owner, CFO, ESG officer. Viewed weekly or monthly.
> **Sub-tabs**: Overview | Carbon & ESG

---

## Sub-tab: Overview

### Row 1 — Six KPI Tiles

Cards with sparkline, delta arrow, hover glow.

| # | Metric | Unit | Notes |
|---|--------|------|-------|
| 1 | Energy Saved This Month | kWh + % | vs baseline |
| 2 | Cost Saved This Month | ₩ | month-on-month delta |
| 3 | CO₂ Reduced YTD | tCO₂e | cumulative |
| 4 | System Health Score | 0–100 | composite gauge |
| 5 | Active OEH Strategies | X of 20 | status pill (green count) |
| 6 | Data Freshness | traffic light | last sensor reading timestamp |

**Design**: each tile is a `Card` with `--surface` background, 6px radius, hover glow border. Sparkline uses `--primary-bright` gradient fill. Delta arrow green (positive) or `--danger` (negative). Health Score rendered as a small thick-arc gauge inside the card.

### Row 2 — Expected vs Actual Energy

- **Chart type**: 12-month grouped bar chart
- **Bars**: Baseline Expected kWh (muted green `--primary`) vs Actual kWh (`--primary-bright`)
- **Coloring**: green shading where actual < baseline (saving); red where actual > baseline (over-baseline)
- **Annotations**: vertical event markers where OEH strategy changes were implemented, labeled (e.g., "Opp. 1 activated", "Chiller staging optimized")
- **Gradient**: actual bars get vertical gradient fill; baseline bars use flat muted fill
- **Tooltip**: custom dark card showing both values, delta, and which strategies were active

### Row 3 — Two Panels Side by Side

**Left: Cumulative Savings Trajectory**
- Gradient area chart showing running currency total since project start
- Animated counter for total savings (odometer-style incrementing number)
- Annotation markers at key milestones
- The "value meter" — the most investor-friendly chart

**Right: Top 3 Plain-Language Issues**
- Business text cards — no technical codes
- Each card: severity badge (high/med/low), plain sentence describing the issue, estimated waste this month, linked OEH strategy number and name
- Example: "HVAC starting 90 min too early — est. ₩480,000 waste this month (OEH Opp. 1 — Optimum Start/Stop)"
- Click card → navigates to DB-2 with that fault highlighted

### Row 4 — Two Panels

**Left: HVAC Energy as % of Total**
- Donut chart with industry benchmark annotation ring
- Center text: "40% of total / 70% of base building" (contextual)
- Segments: HVAC, Lighting, Plug Loads, Other
- Uses green spectrum (no rainbow); hover segment → tooltip with kWh and cost

**Right: Simple Payback Tracker**
- Table or horizontal card stack: one row per active strategy
- Columns: strategy name, investment amount, monthly measured saving, revised payback period, progress bar to breakeven
- Row click → drills to DB-5 Strategy Scorecard for that strategy
- Sparkline per row showing monthly savings trend

---

## Sub-tab: Carbon & ESG

### Scope 2 Emissions
- 12-month bar chart: kWh × grid emission factor → tCO₂e
- Gradient green bars; baseline overlay line

### Carbon Intensity Trend
- Rolling line chart: tCO₂e/m²/year
- Benchmark target horizontal line (e.g., Korean Green Building standard)
- Confidence band around trend

### Emissions Compliance Gauge
- Thick-arc gauge: allocated quota vs actual emissions
- Traffic-light zones (green/amber/red)
- Center text: current vs limit

### Emissions Attribution Donut
- By system type (HVAC / Lighting / Plug loads)
- Optional: by tariff period
- Click segment → filter other charts on this page

### Decarbonisation Projection
- Current trend line extended to 2030 target
- Shaded confidence interval
- Target line clearly marked
- Gap annotation: "X tCO₂e remaining to target"

### OEH Strategy GHG Attribution
- Horizontal bar chart: which of the 20 strategies saved the most CO₂ this month
- Sorted by impact (largest first)
- Each bar labeled with strategy name and number

### Export Button
- Structured CSV export for TCFD / CDP / ESG reporting frameworks

---

## Interactions Summary

- KPI tile hover → definition tooltip
- Donut segment click → filter
- Strategy row / card click → drill to DB-5
- Issue card click → drill to DB-2
- Chart hover → synced crosshair with custom dark tooltips
- Export buttons on charts and tables

---

## Data Shape

```ts
type DB1KPIs = {
  energySavedKwh: number;
  energySavedPct: number;
  costSaved: number;
  costDeltaMoM: number;
  co2ReducedYtd: number;
  systemHealthScore: number;
  activeStrategies: number;
  totalStrategies: number;
  dataFreshness: "green" | "amber" | "red";
  lastSensorReading: string; // ISO timestamp
};

type MonthlyEnergyBar = {
  month: string;
  baselineKwh: number;
  actualKwh: number;
  events: { label: string; oehOpp: number }[];
};

type CumulativeSavings = {
  date: string;
  totalSaved: number; // currency
};

type PlainLanguageIssue = {
  id: string;
  severity: "high" | "med" | "low";
  message: string;
  estimatedWaste: number;
  oehOpp: number;
  oehName: string;
};

type PaybackRow = {
  strategyId: string;
  name: string;
  investment: number;
  monthlySaving: number;
  revisedPaybackMonths: number;
  progressPct: number;
};

type CarbonData = {
  monthlyEmissions: { month: string; tco2e: number }[];
  intensityTrend: { date: string; tco2ePerM2: number }[];
  complianceQuota: number;
  complianceActual: number;
  attributionBySystem: { system: string; tco2e: number }[];
  strategyGhg: { strategyId: string; name: string; co2Saved: number }[];
  projectionTrend: { date: string; projected: number; target: number }[];
};
```
