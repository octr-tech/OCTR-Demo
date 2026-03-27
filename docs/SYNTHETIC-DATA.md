# Synthetic Data Spec — OCTR Demo

Goal: Deterministic demo dataset that always tells the same story (issues + improvements), swappable with real BAS/BEMS via an adapter.

## Entities
- Portfolio
  - Buildings (id, name, address, coordinates, floors, area, year, certification)
    - Floors (index, area, zones)
      - Zones (id, type: office/conf room/core)
    - Systems (AHU, chiller, boiler, cooling tower, VAV, pumps)
    - Equipment (per system) with points
    - Meters (electric, gas, heat, water) with main/submeter flag

## Timeseries (4 weeks)
- Weather: OAT, humidity, solar irradiance.
- Occupancy proxy: normalized [0..1], weekday vs weekend patterns.
- HVAC: supply/return air temp, valve positions, damper positions, fan speed %, static pressure, chilled/hot water temps.
- Energy: whole-building kW, system-level kW, meter kWh, cost, CO₂ (using an intensity factor).
- Comfort: zone temps vs setpoints, compliance %, wellbeing score.
- Fault signals: flags for setpoint deviation, schedule mismatch, sensor malfunction; severity.

## Storyline (baked into data)
- Week 1–2: Inefficient schedules + setpoint drift -> higher kW, comfort violations.
- Midpoint: “Optimization ON” event -> reduced kW, improved comfort, fewer faults.
- Specific floors hotter in afternoons (east/west solar) to showcase comfort heatmap.
- A couple of persistent faults on AHU (setpoint deviation) to show tasks/recs.

## Data adapter shape (client expects)
```ts
type TimeseriesPoint = { t: string; v: number };
type Series = { id: string; label: string; unit?: string; points: TimeseriesPoint[] };

type BuildingData = {
  meta: { id: string; name: string; coords: [number, number]; floors: number; area: number };
  kpis: { savingsUsd: number; savingsKwh: number; savingsTco2: number; comfort: number; uptime: number };
  timeseries: {
    energy: Series[];
    comfort: Series[]; // per zone/floor
    weather: Series[];
    faults: Series[];   // fault counts / severities
  };
  meters: { id: string; name: string; type: "electric"|"gas"|"heat"|"water"; isSub: boolean; cost: number; co2: number; energy: number }[];
  faults: { id: string; system: string; severity: "low"|"med"|"high"; message: string; start: string; end?: string }[];
  strategies: { id: string; name: string; status: "active"|"paused"|"scheduled"; savings: { usd: number; kwh: number; co2: number }; impact: string }[];
};
```

## Precomputed artifacts
- Baseline model: kW vs OAT regression (with R² and confidence) for M&V page.
- Adjusted baseline series: what energy would have been without optimization.
- Before/after overlays: aligned to the “Optimization ON” event timestamp.

## Determinism
- Seeded random with fixed seed.
- Generated once and checked in (JSON/TS file).

## Later swap to real data
- Implement the same adapter interface; support CSV upload or API fetch.
- Keep synthetic as fallback to ensure demo reliability.
