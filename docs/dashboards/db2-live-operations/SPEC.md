# DB-2 — Live Operations & Priority Actions

> **Route**: `/operations`
> **Persona**: Facility manager, building operator. The primary daily screen.
> **Sub-tabs**: None (single unified page)

---

## Row 1 — DDC Status Ribbon

Horizontal scrollable strip of status tiles, one per DDC (Direct Digital Controller).

| State | Condition | Color |
|-------|-----------|-------|
| Live | Last reading < 5 min | `--primary-bright` (green) |
| Stale | 5–30 min | `--warning` (amber) |
| Offline | > 30 min | `--danger` (red) |

Each tile shows:
- DDC identifier
- Last-seen timestamp
- BACnet point count
- Active alarm count (badge)

**Interaction**: click tile → navigates to DB-6 DDC Deep Dive for that controller.

**Design**: tiles use `--surface` bg, 6px radius, status-colored left border accent. Hover glow. Scrollable with fade edges on overflow.

---

## Row 2 — Prioritized Action List

The core of this page. A table/card list sorted by estimated kWh/day waste (highest first).

### Columns

| Column | Description |
|--------|-------------|
| Severity | Icon + color (🔴 high, 🟡 med, 🟨 low) |
| Fault Type | e.g., "Simultaneous H+C", "Economy Cycle Disabled" |
| Equipment | e.g., "AHU-03 Floor 7" |
| Duration | e.g., "3 days" |
| Est. kWh/day Waste | numeric, sorted descending |
| OEH Strategy | # + name, e.g., "Opp. 3 — Master SAT Signal" |
| Status | OPEN / ACK / IN PROGRESS |

### Example Rows (synthetic data story)

1. 🔴 Simultaneous H+C | AHU-03 Floor 7 | 3 days | ~280 kWh/day | Opp. 3 — Master SAT Signal
2. 🔴 Economy Cycle Disabled | AHU-01 | 6 days | ~190 kWh/day | Opp. 10 — Economy Cycle
3. 🟡 HVAC Early Start 90 min | Building-wide | Daily | ~150 kWh/day | Opp. 1 — Optimum Start/Stop
4. 🟡 DSPR Fixed Setpoint | AHU-02 | 2 days | ~90 kWh/day | Opp. 5 — Duct Static Pressure Reset
5. 🟨 CO₂ 580 ppm but OA 100% | Floor 3 | 1 day | ~45 kWh/day | Opp. 12 — DCV

**Interaction**: click row → side panel opens with:
- Full fault description
- Affected equipment details
- Recommended action (plain language)
- Energy impact calculation with assumptions
- Link to relevant DB-3 sub-tab
- Link to DB-5 strategy detail
- "Create Task" / "Acknowledge" / "Escalate" action buttons

**Design**: card-style rows with severity-colored left border. Hover glow. Side panel slides from right with persistent header (fault title + severity + equipment), scrollable body, sticky footer with action buttons.

---

## Row 3 — 24H Demand Curve

Area chart showing energy demand profile for today.

### Series (3 layered areas)
1. **Today**: solid green gradient fill (`--primary-bright` → transparent)
2. **Yesterday**: muted dashed line, no fill
3. **7-day average**: faint band (low opacity `--primary`)

### Annotations & Overlays
- **Peak tariff hours**: shaded background band (e.g., 09:00–12:00, 13:00–17:00) in subtle `--warning` at 5% opacity
- **OEH optimal HVAC start window**: annotated vertical region — is Optimum Start/Stop operating correctly?
- **Peak demand counter**: prominent badge showing this month's peak kW vs contract limit; color shifts amber→red as it approaches limit

**Interaction**: hover → synced crosshair tooltip showing all three series values at that time. Click annotation → side panel with detail.

---

## Row 4 — Alert Severity Heatmap

ECharts heatmap revealing chronic vs one-off problems.

- **Y-axis**: DDC identifiers (all controllers)
- **X-axis**: day of week (or last 30 days)
- **Color**: alert severity count — green (0-1) → amber (2-5) → red (6+)
- **Color ramp**: narrow, no rainbow — uses `--primary-bright` to `--danger` spectrum

**Interaction**: click any cell → jumps to DB-6 DDC Deep Dive for that DDC on that day.

**Design**: dark background with bright cells; tooltip on hover shows DDC name, date, alert count, top fault type.

---

## Data Shape

```ts
type DDCStatus = {
  id: string;
  name: string;
  lastSeen: string; // ISO timestamp
  status: "live" | "stale" | "offline";
  pointCount: number;
  activeAlarms: number;
};

type PrioritizedFault = {
  id: string;
  severity: "high" | "med" | "low";
  faultType: string;
  equipment: string;
  floor?: number;
  durationDays: number;
  estKwhPerDay: number;
  oehOpp: number;
  oehName: string;
  status: "open" | "ack" | "in_progress";
  description: string;
  recommendedAction: string;
  relatedDb3Tab?: "water" | "air" | "zones" | "equipment";
};

type DemandCurvePoint = {
  time: string; // HH:mm
  todayKw: number;
  yesterdayKw: number;
  avg7dKw: number;
};

type DemandMeta = {
  peakTariffWindows: { start: string; end: string }[];
  ossStartWindow: { start: string; end: string };
  monthPeakKw: number;
  contractLimitKw: number;
};

type AlertHeatmapCell = {
  ddcId: string;
  date: string;
  alertCount: number;
  topFaultType?: string;
};
```
