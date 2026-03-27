# DB-3 — Systems Intelligence

> **Route**: `/systems`
> **Persona**: Building operator, HVAC engineer. Full plant monitoring by circuit.
> **Sub-tabs**: Water Side | Air Side | Zones | Equipment Health

---

## Sub-tab: Water Side (`/systems/water`)

*OEH Opportunities: 4 (Chiller Staging), 7 (CHW Reset), 8 (CW Reset), 14 (Pump ΔP Reset), 15 (VSD Pumps), 16 (VSD Fans / Free Cooling)*

### Canvas One-Line Diagram (full-width top section)

SCADA-style SVG showing the chilled/condenser water loop:

```
Chiller → Primary Pumps → Secondary Pumps → AHUs
                                              ↕
Cooling Tower ← Condenser Pumps ← Chiller (condenser side)
```

- Live sensor values overlaid on the diagram (temperatures, pressures, flow rates)
- Color-coded pipework: blue (cold/OK), orange (warm/underperforming)
- Interactive: click any component → detail side panel with that component's current readings, recent trend, and linked OEH opportunities

**Design**: SVG rendered in a dark card container. Pipes use stroke colors from palette. Sensor value labels in small `--text` badges on the pipes. Glow effect on active components.

### Four Core KPI Gauges (2×2 grid below diagram)

| Gauge | What it shows | Target | Red flag | OEH Opp |
|-------|--------------|--------|----------|---------|
| Evaporator ΔT | CHWR − CHWS | > 5°C | < 3°C = low ΔT syndrome → compressor waste | 7 |
| Condenser Approach | CW leaving tower − wet bulb OA | < 2.5°C | > 4°C = fouling/fan fault | 8 |
| CHW Supply vs Reset Curve | Actual setpoint vs load-based schedule | On curve | Flat line = reset disabled | 7 |
| Pump ΔP vs Reset Setpoint | Actual differential pressure vs reset | Tracking load | Fixed value = no reset | 14 |

**Design**: thick-arc gauges with green progress arc on `--surface` card. Target zone marked. Current value as large center text. Below gauge: trend sparkline (24h).

### Chiller Staging Panel (Opp. 4)

- **Bar chart**: which chillers running at what % load — suboptimal staging instantly visible (two at 40% vs one at 80%)
- **COP trend**: line chart of kW-cooling / kW-electrical, 12-hour rolling; annotation showing efficiency comparison
- **Staging recommendation**: text card — "Current: 2 chillers at 38% each. Optimal: 1 chiller at 76%. Est. saving: X kWh/day"

### VSD & Free Cooling Panel (Opps. 15, 16)

- **Scatter**: pump/fan VSD % speed vs system load % — flat speed with variable load = waste
- **Runtime balance bars**: hours per pump since last maintenance (horizontal bars)
- **Free cooling opportunity**: bar chart — hours/month outdoor wet bulb was low enough for waterside economizer; actual hours used vs available

---

## Sub-tab: Air Side (`/systems/air`)

*OEH Opportunities: 3 (Master SAT / Simultaneous H+C), 5 (DSPR), 6 (HW Reset), 10 (Economy Cycle), 11 (Night Purge)*

### AHU Selector

Dropdown at top of page: select individual AHU or "Fleet View" (aggregated). All panels below update.

### State Timeline Panel

- Horizontal colored bars showing operating states over 24h:
  - Fan Run (gray), Occupied (green), Heating Active (orange), Cooling Active (blue), Economy Cycle (cyan), Night Purge (purple)
- **Simultaneous H+C hours highlighted red** (Opp. 3) — one of the largest individual wastes
- Timeline is scrollable for multi-day view

**Design**: horizontal bars stacked per state. Use palette hues. Red overlay for simultaneous H+C with "WASTE" annotation.

### Temperature Analysis

- **Three-line chart**: SAT actual (solid green) vs SAT setpoint (dashed) / Return Air Temp (amber) / Outdoor Air Temp (muted)
- **Master SAT Signal panel** (Opp. 3): is SAT driven by worst single zone (high-select — wasteful) or weighted average (optimal)? Divergence plotted as shaded gap between the two approaches
- **SAT Reset Performance** (Opp. 3): scatter of SAT vs cooling load — flat horizontal cluster = reset disabled; sloped = reset active

### DSPR Panel (Opp. 5)

- **Line chart**: actual duct static pressure vs optimal reset setpoint over time
- **Histogram**: VAV box positions — if most boxes < 50% open → pressure too high → fan over-running
- **Scatter**: fan VSD speed vs static pressure — should respond proportionally
- **Annotation**: "−20% fan speed = −49% fan power" (fan affinity law)

### Economy Cycle Panel (Opp. 10)

- **Dual-line chart**: live OA enthalpy vs RA enthalpy; activation threshold line (52 kJ/kg) clearly marked
- **Grouped bar**: hours/day economy cycle was ACTIVE vs hours it was AVAILABLE (gap = missed free cooling)
- **Lockout criteria panel**: temp > 20°C, enthalpy > 52 kJ/kg, dew point > 12°C — shown as checklist with current values

### Night Purge Panel (Opp. 11)

- **Activation conditions**: space > 25°C AND OA at least 5°C cooler — shown as status indicators
- **Comparison chart**: pre-occupancy space temperature WITH vs WITHOUT night purge; startup energy comparison bar

### HW Reset Panel (Opp. 6)

- **Line chart**: HW delivery temperature vs optimal reset curve (raise setpoint during mild weather for boiler efficiency)

---

## Sub-tab: Zones (`/systems/zones`)

*OEH Opportunities: 2 (Setpoints & Dead Bands), 12 (DCV)*

### Floor Plan Canvas (full-width top)

- Building SVG floor plan — zones color-coded by deviation from setpoint
- Zones outside acceptable range (e.g., 20–26°C) flagged with red border (Opp. 2)
- **Timeline scrubber**: drag to animate through the day (same pattern as planning chat comfort heatmap)
- Click any zone → side panel with 24H trend chart, setpoint schedule, nearby faults, occupancy data

**Design**: dark background, zones as filled polygons. Color ramp: deep green (comfortable) → amber → warm red (uncomfortable). No rainbow. Scrubber below uses `--primary` accent.

### Setpoint & Dead Band Panel (Opp. 2)

- **Gauge per zone**: dead band value vs recommended 2–3°C
- **Compliance chart**: seasonal setpoint compliance (summer 24–26°C / winter 20–22°C)
- **Zone hunting detector**: highlight zones with > 4 setpoint crossings/hour = dead band too narrow → cycling waste
- **Annotation**: "Each 1°C below 2°C dead band ≈ 10% more HVAC energy"

### Comfort Intelligence

- **Overcooling/Overheating Heatmap**: zone on Y-axis, hour on X-axis, color = °C deviation from setpoint
- **Occupied vs unoccupied check**: binary chart showing whether systems correctly shut down after hours
- **Hot/cold predictor**: zones trending toward discomfort threshold — proactive FM dispatch list

### DCV Panel (Opp. 12)

- **Live CO₂ per zone** (ppm): bar chart with target band (800–1,000 ppm)
- **DCV efficiency indicator**: zones where CO₂ < 600 ppm with OA damper at 100% = over-ventilating (highlighted red)
- **OA reduction chart**: hours/day of reduced outdoor air → direct chiller saving; annotation: "up to 20% OA pre-conditioning energy per OEH"

---

## Sub-tab: Equipment Health (`/systems/equipment`)

*OEH Opportunities: 9 (EEV vs TXV), 19 (Filter Maintenance), 20 (BMS Audit)*

### Equipment Health Scorecard Table

| Column | Description |
|--------|-------------|
| Equipment | Name + type icon |
| Runtime Hours | Since last service vs recommended interval |
| Start/Stop Cycles | Count (high = wear) |
| Efficiency | % of nameplate (with sparkline trend) |
| Health Score | 0–100 gauge mini |
| Status | Badge: ON TRACK / DUE SOON / OVERDUE |

Row click → side panel with full maintenance history and trend charts.

### EEV vs TXV Monitor (Opp. 9)

- **Comparison bar chart**: superheat per refrigeration circuit — EEV target 2–3°C vs TXV conservative 5–7°C
- Systems on TXVs flagged: "Est. 15% compressor saving potential if retrofitted to EEV"

### Degradation Trend Indicators

- **Cooling tower approach temp**: 90-day trend line — rising = fouled fill or fan underperforming
- **Chiller COP at equivalent loads**: monthly line — gradual decline = tube scaling
- **AHU filter ΔP trend**: rising differential pressure = blocked filter = more fan energy (Opp. 19)

### BMS Software Audit Panel (Opp. 20)

- **Critical alert**: any of the 20 OEH strategies disabled in last 30 days? (red alert card)
- **Change log**: recent setpoint/schedule changes — who, what, when
- **OSS learning health**: is the adaptive algorithm still updating? Last calculation timestamp + trend

---

## Data Shape

```ts
type WaterSideDiagram = {
  components: {
    id: string;
    type: "chiller" | "pump" | "tower" | "ahu";
    status: "running" | "standby" | "fault";
    sensors: { label: string; value: number; unit: string }[];
  }[];
  pipes: { from: string; to: string; tempC: number; flowLps?: number }[];
};

type KPIGauge = {
  label: string;
  current: number;
  target: number;
  redThreshold: number;
  unit: string;
  oehOpp: number;
  sparkline: number[]; // 24h trend
};

type ChillerStaging = {
  chillers: { id: string; loadPct: number; copKwPerKw: number; running: boolean }[];
  copTrend: { t: string; cop: number }[];
};

type AHUState = {
  ahuId: string;
  timeline: { t: string; states: ("fan" | "occupied" | "heating" | "cooling" | "economy" | "purge" | "simHC")[] }[];
};

type TemperatureAnalysis = {
  points: { t: string; satActual: number; satSetpoint: number; rat: number; oat: number }[];
};

type ZoneComfort = {
  zoneId: string;
  name: string;
  floor: number;
  polygon: number[][]; // SVG coordinates
  points: { t: string; temp: number; setpoint: number; co2Ppm?: number; occupancy?: number }[];
  deadBandC: number;
  crossingsPerHour: number;
};

type EquipmentHealth = {
  id: string;
  name: string;
  type: string;
  runtimeHours: number;
  recommendedInterval: number;
  startStopCycles: number;
  efficiencyPct: number;
  nameplatePct: number;
  healthScore: number;
  status: "on_track" | "due_soon" | "overdue";
};
```
