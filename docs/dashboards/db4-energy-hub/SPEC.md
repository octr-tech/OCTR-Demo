# DB-4 — Energy Hub & Metering

> **Route**: `/energy`
> **Persona**: FM + energy manager. Single page (no sub-tabs).
> **Focus**: Demand management, sub-metering transparency, tariff intelligence.

---

## Row 1 — KPI Tiles (6 cards)

| # | Metric | Unit | Notes |
|---|--------|------|-------|
| 1 | Current kW Demand | kW | live value with pulse animation |
| 2 | Today's Peak kW | kW | timestamp of occurrence |
| 3 | This Month's Peak kW | kW | demand charge driver |
| 4 | Contract Limit | kW | static reference, red glow if month peak > 90% |
| 5 | Power Factor | ratio | penalty threshold indicator |
| 6 | EUI | kWh/m²/yr | with benchmark comparison |

**Design**: same card pattern as DB-1 (sparkline + delta). Current kW gets a subtle pulse animation when live data updates.

---

## Row 2 — Metering Overview (three panels)

### Sub-Meter Breakdown (Sankey or Stacked Bar)

- **Sankey diagram** (preferred): animated particles flowing from total building consumption → HVAC / Lighting / Plug Loads / Other
- Green spectrum for flows; red branch only for identified waste
- Particle animation speed proportional to flow volume
- Alternative: stacked bar if Sankey is too complex for v1

**Design**: ECharts Sankey with custom theme from `chart-theme.json`. Dark background, green node colors, animated particles.

### Meter Health Status

- Each meter as a small status card: name, last reading timestamp, comm status badge, data completeness % bar
- Stale or missing meters flagged with `--warning` or `--danger` border

### Virtual vs Physical Metering Flag

- All panels/charts clearly labeled:
  - **Solid border** = physically measured data
  - **Dashed border** = estimated / virtual metered data
- Small info icon with tooltip explaining virtual metering methodology

---

## Row 3 — Demand Profile

- **Area chart**: 24H demand profile
  - Today: solid `--primary-bright` gradient fill
  - Yesterday: dashed line, no fill
  - 7-day average: faint band
- **TOU tariff band shading**: peak hours as background bands in subtle `--warning` at 5% opacity
- **Peak demand event marker**: vertical line at the exact timestamp when this month's demand charge was locked in; annotated badge

**Interaction**: hover → synced crosshair showing kW values for all three series + tariff band label.

---

## Row 4 — Energy Calendar + TOU Breakdown

### Calendar Heatmap (left, wider)

- ECharts heatmap: hours on X-axis (0–23), days on Y-axis (last 30 days)
- Color = kW consumed at that hour
- OSS performance visible: are HVAC start times earlier than optimal? (early morning cells shouldn't be hot)
- Click cell → loads that hour's demand profile in the Row 3 chart

**Design**: narrow green ramp (low kW = dark, high kW = `--primary-bright`). No rainbow.

### Time-of-Use Pie (right, narrower)

- Pie chart: % energy consumed in peak / mid / off-peak tariff windows
- Labeled segments with kWh and cost values
- Link annotation: "Can setpoint adjustments shift load to off-peak? → See OEH Opp. 2"

---

## Row 5 — Metering Drill-Downs (expandable accordion)

### HVAC Sub-Meter Trend
- Stacked area chart: chiller + AHU fans + pumps individual contribution over 30 days
- Each system in a different shade of green from the palette

### Interval Meter Data Table
- 15-min or 30-min interval data per meter
- Columns: timestamp, meter name, kWh, kW demand, power factor
- Sortable, filterable, **downloadable CSV**
- Sticky header, dense table styling

### Meter vs BMS Cross-Check
- Comparison chart: meter reading vs BMS-calculated value
- Discrepancy > threshold → flagged with `--danger` annotation
- "Sensor or calibration discrepancy alert" badge

---

## Row 6 — Tariff & Financial Intelligence (expandable accordion)

### Monthly Cost Breakdown
- Stacked bar or waterfall: energy charge vs demand charge vs power factor penalty vs reactive power charge
- Itemized bill reconstruction — shows the actual cost drivers

### Load Factor Trend
- Line chart: peak kW / average kW by month
- Improving load factor = lower demand charges
- Target line overlay

### Power Factor Monitor
- Live gauge: current PF vs penalty threshold (e.g., 0.9)
- Financial alert if PF drops below threshold: "Estimated penalty: ₩X"

### Demand Response Readiness
- Card: estimated kW shed potential for next DR event
- List of deferrable loads with kW contribution

### Weather Correlation Scatter
- Scatter plot: outdoor temperature (KMA data) vs daily energy consumption
- Weather-normalized anomaly detection: points far from the regression = investigate
- Regression line with R² displayed

---

## Data Shape

```ts
type EnergyKPIs = {
  currentKw: number;
  todayPeakKw: number;
  todayPeakTime: string;
  monthPeakKw: number;
  monthPeakTime: string;
  contractLimitKw: number;
  powerFactor: number;
  eui: number; // kWh/m²/yr
  euiBenchmark: number;
};

type SankeyFlow = {
  source: string;
  target: string;
  value: number; // kWh
};

type MeterStatus = {
  id: string;
  name: string;
  type: "electric" | "gas" | "heat" | "water";
  isVirtual: boolean;
  lastReading: string;
  commStatus: "ok" | "stale" | "offline";
  completeness: number; // 0-100
};

type DemandProfilePoint = {
  time: string;
  todayKw: number;
  yesterdayKw: number;
  avg7dKw: number;
};

type CalendarHeatmapCell = {
  date: string;
  hour: number;
  kw: number;
};

type TouBreakdown = {
  period: "peak" | "mid" | "off_peak";
  kwh: number;
  cost: number;
  pct: number;
};

type IntervalMeterRow = {
  timestamp: string;
  meterId: string;
  meterName: string;
  kwh: number;
  kwDemand: number;
  powerFactor: number;
};

type MonthlyCostBreakdown = {
  month: string;
  energyCharge: number;
  demandCharge: number;
  pfPenalty: number;
  reactiveCharge: number;
  total: number;
};

type WeatherCorrelation = {
  date: string;
  oatC: number;
  dailyKwh: number;
  isAnomaly: boolean;
};
```
