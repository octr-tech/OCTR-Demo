# DB-5 — Optimization & Analytics

> **Route**: `/optimization`
> **Persona**: Energy manager, building consultant, owner.
> **Sub-tabs**: Strategy Scorecard | Analytics & Trends | M&V Baseline
> **Core message**: "Are the strategies working — what does the data prove?"

This is the **unique differentiator** — neither Aedifion nor BrainBox AI has this view.

---

## Sub-tab: Strategy Scorecard (`/optimization/scorecard`)

### Row 1 — 20-Strategy Status Grid

Responsive card grid. One card per OEH/AIRAH strategy.

**Each card contains**:
- Strategy name + opportunity number (e.g., "Opp. 1 — Optimum Start/Stop")
- Status badge: 🟢 ACTIVE / 🟡 UNDERPERFORMING / 🔴 INACTIVE / ⚫ N/A
- Savings this month: kWh + currency (animated incrementing counter)
- Measured vs expected delta (% over/under target)
- Trend arrow: ↑ improving / → stable / ↓ worsening
- Small sparkline showing last 4 weeks

**Design**: cards with `--surface` bg, status-colored top border, hover glow. The live savings counter uses a smooth odometer animation. Grid adapts: 4 columns on desktop, 2 on tablet, 1 on mobile.

**Interaction**: click card → expands to inline detail OR opens full side panel.

### Row 2 — Top 5 Strategy Deep-Dives (expandable accordion)

Each deep-dive is a collapsible card that expands to show strategy-specific charts:

#### Opp. 1 — Optimum Start/Stop (OSS)
- **Scatter plot**: actual HVAC start time vs optimal calculated start time, by day
- Red dots = started too early; green = within window
- **Bar chart**: monthly operating hours saved
- **Text**: description of the algorithm, current learning status

#### Opp. 2 — Setpoints & Dead Bands
- **Histogram**: zone dead band distribution vs OEH recommended 2–3°C target
- Annotation: "Each 1°C below 2°C dead band ≈ 10% more HVAC energy"
- **Compliance heatmap**: zones meeting vs not meeting seasonal setpoint targets

#### Opp. 5 — Duct Static Pressure Reset (DSPR)
- **Line chart**: actual static pressure vs optimal reset setpoint over time
- **Interactive calculator**: fan affinity savings — slider for pressure reduction, shows kWh savings
- Annotation: "−20% fan speed = −49% fan power"

#### Opp. 7 — Chilled Water Reset
- **Dual-axis chart**: CHWS setpoint vs optimal reset curve; chiller kW/RT at current vs optimal CHW temp
- Gap between curves = missed efficiency

#### Opp. 10 — Economy Cycle
- **Grouped bar**: hours/month economy cycle ACTIVE vs hours AVAILABLE
- Gap between bars = missed free cooling opportunity
- **Savings estimate**: free cooling hours × avg kW offset

### Row 3 — Savings Attribution

- **Stacked weekly bar chart**: which strategies contributed how much kWh each week
  - Each segment a different green shade from the palette
  - Hover segment → tooltip with strategy name and kWh value
- **Strategy effectiveness gap ranking**: horizontal bar chart
  - Actual savings vs potential savings per strategy
  - Sorted by gap size (largest gap = highest priority for optimization)
  - Click bar → navigate to that strategy's deep-dive

---

## Sub-tab: Analytics & Trends (`/optimization/analytics`)

### 30-Day Rolling Efficiency
- Multi-line chart: kW/RT (chiller plant), kJ/m³ (AHU), W/m² (whole building)
- Each metric on its own Y-axis; synced X-axis
- Trend direction annotation

### 48H Energy Forecast
- Predicted consumption for next 48 hours with confidence interval band
- Actual overlaid as it comes in (if live data available)
- Note: requires 30+ days of data to be meaningful

### Anomaly Detection Log
- Z-score time-series chart for key energy metrics
- Annotated spikes with fault classification markers (click → link to DB-2 or DB-6)
- Threshold lines at ±2σ and ±3σ

### Sensor Drift Detector
- Table/chart of datapoints where 7-day moving average shifted > 5% vs 30-day baseline
- Calibration alert badge
- Click → navigate to DB-6 DDC Deep Dive for that sensor

### Long-term Trend Decomposition
- Seasonal / trend / residual component breakdown
- Slow equipment degradation visible months before it shows in daily views
- Useful for proactive maintenance scheduling

---

## Sub-tab: M&V Baseline (`/optimization/mv`)

### Baseline vs Actual — Interactive Stepper

Four-step animated walkthrough:

**Step 1: Baseline Model**
- kW vs outdoor air temperature scatter plot + regression line
- R² value displayed prominently
- Confidence interval band around regression
- Annotation: "This model represents how the building used energy BEFORE optimization"

**Step 2: Adjusted Baseline**
- Line chart: predicted energy for the reporting period (weather-normalized)
- "This is what energy WOULD have been this month based on the weather we actually had"

**Step 3: Actual Consumption**
- Measured energy overlaid on the adjusted baseline
- Gap between the two lines highlighted in green = savings

**Step 4: Verified Savings**
- Shaded area chart: adjusted baseline − actual = verified savings
- Confidence interval band
- Total $ / kWh / tCO₂e summary card
- "These savings are verified to X% confidence"

**Design**: stepper/accordion component. Each step, when activated, animates the chart to add the next data layer (Framer Motion, 500ms ease). Steps have numbered circles connected by a line.

### Cumulative Avoided Energy (CAE)
- Gradient area chart: running total of energy NOT consumed since project start
- Milestone markers at key dates

### Weather-Normalized EUI
- HDD/CDD-adjusted energy intensity chart
- Removes weather as a variable — shows true performance improvement
- Before/after optimization comparison

### Live Payback Calculator
- Table: one row per strategy
- Columns: strategy name, investment, actual savings to date, revised payback period, original estimate, delta
- Sparkline per row showing savings accumulation
- Sort by payback progress

### Savings Waterfall
- Waterfall chart: strategy-by-strategy contribution to total savings
- Each bar = one strategy's contribution
- Labeled with strategy name and kWh
- Running total annotation at each step
- Final bar = verified total

---

## Data Shape

```ts
type StrategyCard = {
  id: string;
  oehOpp: number;
  name: string;
  status: "active" | "underperforming" | "inactive" | "na";
  savingsKwh: number;
  savingsCurrency: number;
  measuredVsExpectedPct: number;
  trend: "improving" | "stable" | "worsening";
  weeklySparkline: number[]; // last 4 values
};

type StrategyDeepDive = {
  oehOpp: number;
  charts: any; // strategy-specific, defined per opportunity
  description: string;
  learningStatus?: string;
};

type WeeklyAttribution = {
  week: string;
  strategies: { strategyId: string; name: string; kwh: number }[];
};

type EffectivenessGap = {
  strategyId: string;
  name: string;
  actualKwh: number;
  potentialKwh: number;
  gap: number;
};

type RollingEfficiency = {
  date: string;
  kwPerRt: number;
  kjPerM3: number;
  wPerM2: number;
};

type AnomalyPoint = {
  timestamp: string;
  metric: string;
  zScore: number;
  classification?: string;
};

type BaselineModel = {
  scatter: { oatC: number; kw: number; timestamp: string }[];
  regression: { slope: number; intercept: number; r2: number };
  ciUpper: number[];
  ciLower: number[];
};

type MVStep = {
  step: 1 | 2 | 3 | 4;
  label: string;
  description: string;
  series: { t: string; baseline?: number; adjusted?: number; actual?: number; savings?: number }[];
};

type PaybackRow = {
  strategyId: string;
  name: string;
  investment: number;
  savingsToDate: number;
  revisedPaybackMonths: number;
  originalEstimateMonths: number;
};

type WaterfallStep = {
  strategyId: string;
  name: string;
  kwh: number;
  runningTotal: number;
};
```
