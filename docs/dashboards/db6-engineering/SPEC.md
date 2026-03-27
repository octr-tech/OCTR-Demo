# DB-6 — Engineering & Data (Internal Use Only)

> **Route**: `/engineering`
> **Persona**: Data engineer, software developer, technical HVAC specialist.
> **Sub-tabs**: FDD Register | Pipeline Health | DDC Deep Dive
> **Visibility**: Hidden from client/owner navigation. Accessible only via direct URL or engineer mode toggle.

---

## Sub-tab: FDD Register (`/engineering/fdd`)

### Master Fault Table

Full-width sortable/filterable table of all detected faults.

| Column | Description |
|--------|-------------|
| Fault Type | e.g., "Simultaneous H+C", "DSPR Fixed" |
| OEH Opp. # | Linked strategy number |
| Equipment | Affected equipment identifier |
| First Detected | Date/time |
| Duration | Days active |
| kWh/day Waste | Estimated energy waste rate |
| Severity | HIGH / MED / LOW with color badge |
| Status | OPEN / ACK / CLOSED |

**Design**: dense table with row hover, sticky header. Severity-colored left border on rows. Filter dropdowns above table for severity, status, OEH opp, equipment.

### Fault Priority Matrix

- **ECharts scatter**: Y = severity score, X = days active, bubble size = kWh/day waste
- Top-right quadrant = "fix today" (high severity + long active + high waste)
- Quadrant labels / background shading to make the priority zones obvious
- Click bubble → opens fault detail side panel

### Active FDD Rules

Reference list of all implemented fault detection rules, each mapped to an OEH opportunity:

1. OSS early-start (Opp. 1): HVAC starts > 90 min before occupancy on OA < 20°C days
2. Dead band fault (Opp. 2): zone dead band < 1°C
3. Simultaneous H+C (Opp. 3): heating AND cooling valves both > 30% open
4. Poor chiller staging (Opp. 4): two chillers each < 35% load when one at 70% is more efficient
5. DSPR disabled (Opp. 5): duct pressure fixed despite most VAV boxes < 50% open
6. CHW reset disabled (Opp. 7): CHWS setpoint fixed regardless of load
7. CW reset disabled (Opp. 8): condenser water fixed despite cool ambient
8. Missed economy cycle (Opp. 10): OA enthalpy < 52 kJ/kg but economy not active
9. Night purge fault (Opp. 11): space > 25°C at 05:00 but purge not activated
10. Over-ventilation (Opp. 12): CO₂ < 600 ppm with OA damper 100% open
11. Pump ΔP reset disabled (Opp. 14): CHW differential pressure at fixed value

Each rule: name, condition logic, threshold values, OEH reference, enabled/disabled toggle (demo only).

### Fault Resolution Tracker

- **Histogram**: time-to-resolve distribution (bars by days to close)
- **Bar chart**: energy savings attributed to each closed fault
- **Age distribution**: unresolved fault age — bars showing how long open faults have been active

---

## Sub-tab: Pipeline Health (`/engineering/pipeline`)

### DDC Status Table

| Column | Description |
|--------|-------------|
| DDC ID | Identifier |
| Last Raw Reading | Timestamp |
| Curated Lag | Minutes since last processed record |
| Points Count | Number of BACnet points |
| Error Rate | % of failed reads in last 24h |

### Run Folder Completeness Heatmap

- Expected data files per hour (e.g., 23 CSVs per hour from 23 DDCs)
- Any gap > 2 hours = flagged with `--danger` color
- Heatmap: DDC on Y, hour on X, color = completeness

### Data Quality Flag Heatmap

- DDC on Y, day on X
- Color = quality status: OK (green), MISSING (red), OUTLIER (amber), STUCK (gray)
- Click cell → shows which points are flagged and why

### Sensor Cross-Validation Alerts

- Table of adjacent sensors with divergent readings
- Columns: sensor pair, expected correlation, actual divergence, duration, affected OEH strategies
- "Stuck sensors cause economy cycle and OSS failures"

### Infrastructure Health

- Storage usage trend line
- Service health indicators (uptime %, last restart, error count)
- Cold start frequency (if applicable)

---

## Sub-tab: DDC Deep Dive (`/engineering/ddc/[id]`)

### DDC Selector
Dropdown at top — selects a DDC; all panels below update.

### All Points Live Values

Sortable table of every BACnet point on the selected DDC:

| Column | Description |
|--------|-------------|
| Point Name | BACnet object name |
| Current Value | Live reading |
| 1H Trend | Arrow (↑↓→) |
| Unit | Engineering unit |
| Point Class | AI/AO/BI/BO/AV/BV |
| Quality Flag | OK / SUSPECT / MISSING |

### Binary State Timeline

- Colored horizontal bars for all On/Off/Fault binary states on this DDC
- Each binary point gets a row
- Colors: green = ON, gray = OFF, red = FAULT
- **HVAC start time visible at a glance** — key for OEH Opp. 1 verification
- Scrollable for multi-day view

### Statistical Summary

Tabs: 24H | 7D | 30D

For each numeric point: min, mean, max, standard deviation, last value.
Table or card grid.

### Value Distribution Boxplots

- One boxplot per numeric point (or selectable subset)
- Outliers visible as individual dots
- Useful for sensor calibration checks

### Quality Flag Timeline

- Per-sensor horizontal bar: transitions between OK → SUSPECT → MISSING over time
- Reveals intermittent sensor issues

### Raw Data Export

- DDC selector + date range picker
- Download CSV button
- Columns: timestamp, point name, value, unit, quality flag

---

## Data Shape

```ts
type FDDFault = {
  id: string;
  faultType: string;
  oehOpp: number;
  equipment: string;
  firstDetected: string;
  durationDays: number;
  kwhPerDayWaste: number;
  severity: "high" | "med" | "low";
  status: "open" | "ack" | "closed";
  resolvedDate?: string;
  savedKwh?: number;
};

type FDDRule = {
  id: string;
  name: string;
  oehOpp: number;
  condition: string;
  thresholds: Record<string, number>;
  enabled: boolean;
};

type DDCPipelineStatus = {
  ddcId: string;
  lastRawReading: string;
  curatedLagMinutes: number;
  pointsCount: number;
  errorRatePct: number;
};

type DataQualityCell = {
  ddcId: string;
  date: string;
  status: "ok" | "missing" | "outlier" | "stuck";
  flaggedPoints?: string[];
};

type DDCPoint = {
  name: string;
  currentValue: number | boolean;
  trend1h: "up" | "down" | "stable";
  unit: string;
  pointClass: "AI" | "AO" | "BI" | "BO" | "AV" | "BV";
  qualityFlag: "ok" | "suspect" | "missing";
};

type PointStats = {
  name: string;
  min: number;
  mean: number;
  max: number;
  stdDev: number;
  last: number;
};
```
