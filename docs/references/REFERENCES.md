# REFERENCES — Content & Inspiration

## Competitor screenshots (local paths)
- **Brainbox AI portfolio UI**: `assets/image-bad48439-48d1-40b1-80ed-ed999d7c4e96.png`
- **Aedifion dashboards** (content depth reference, not design):
  1. `assets/Screenshot_2026-03-27_at_9.03.52_AM-4e40565b-db9b-4aa4-a79b-d5edffe2d563.png`
  2. `assets/Screenshot_2026-03-27_at_9.04.42_AM-bf2c8d56-e3a5-4730-b611-4d7608776c3c.png`
  3. `assets/Screenshot_2026-03-27_at_9.04.53_AM-6b800ea2-e926-4c20-af73-ab6f37ce1d36.png`
  4. `assets/Screenshot_2026-03-27_at_9.05.09_AM-4fce45e2-7f2f-4cef-b791-33e2f78a60b9.png`
  5. `assets/Screenshot_2026-03-27_at_9.05.23_AM-765c4c8d-9400-4770-bd55-00adda3654f7.png`
  6. `assets/Screenshot_2026-03-27_at_9.05.37_AM-53598ec7-ad52-4bf4-97ab-b15f44febe00.png`
  7. `assets/Screenshot_2026-03-27_at_9.05.48_AM-7f0f61fc-c298-4e38-b168-7fc5ec410f6c.png`
  8. `assets/Screenshot_2026-03-27_at_9.05.59_AM-d264a525-18ac-41bc-9144-770c1bbcc6ea.png`
  9. `assets/Screenshot_2026-03-27_at_9.06.11_AM-e9f6782d-bd7e-49c9-b184-b6bb7e76ce92.png`
  10. `assets/Screenshot_2026-03-27_at_9.06.21_AM-4fe407b0-2627-43eb-853a-aec64d9350fa.png`
  11. `assets/Screenshot_2026-03-27_at_9.06.31_AM-0d99e770-0b2c-480c-9fcd-9eae6a1d8fa6.png`
  12. `assets/Screenshot_2026-03-27_at_9.06.43_AM-06ad0643-24d7-458a-acd1-402b97fb028e.png`
  13. `assets/Screenshot_2026-03-27_at_9.06.53_AM-9ea899d4-edee-4f01-8240-f086928bbfe9.png`
  14. `assets/Screenshot_2026-03-27_at_9.07.06_AM-ebaf001a-ec82-4608-99b5-e6619112dc05.png`
  15. `assets/Screenshot_2026-03-27_at_9.07.21_AM-7cdce86f-68d6-4cf9-a065-bafd3aa8cd36.png`
  16. `assets/Screenshot_2026-03-27_at_9.07.32_AM-f2459b73-190b-470b-9783-eecc2c5bca7a.png`
  17. `assets/Screenshot_2026-03-27_at_9.07.44_AM-dc6453c9-346d-428f-b272-fecbe30e8e34.png`

## Design anchors
- Supabase: hover/micro-interactions, “alive” dark UI.
- WindPulse (Behance): wind farm monitoring, polished charts.
- Orion UI Kit: infographic-quality charts (Figma).
- Sourceful Energy: energy-specific components/tokens.
- Kepisgroup: deep forest green palette inspiration.

## Chart/library research
- Primary charts: Chart.ts (@chartts/react) — 65+ types, Tailwind-native, tiny bundle.
- Advanced charts: Apache ECharts (echarts-for-react) — heatmaps/Sankey/parallel coords; use custom theme (chart-theme.json).
- Basic/integrated: shadcn/Recharts for simple KPIs.
- Animations: Framer Motion for hover/entry transitions.
- Chart styling rules: gradient fills, line glow, minimal axes, annotations > legends, custom dark tooltips, smooth curves.

## 3D visualization options
- Sketchfab Viewer API (fast embed + annotations).
- React Three Fiber + gltf-exploder (interactive floors, exploded/cutaway).
- Mapbox GL 3D buildings for portfolio/urban context; optional Threebox for custom GLTF on map.
- BIM future: Speckle viewer; ThatOpen/Fragments as modern IFC path.

## Content patterns from Brainbox/Aedifion (what to include)
- Portfolio KPIs (buildings online, data uptime, savings $, kWh, tCO2e), map with markers, leaderboards.
- Asset overview: goals tracking, KPI row (cost, CO₂, energy, wellbeing, technical availability), site hero.
- Datapoints explorer: searchable point list with tag/unit/min/mean/max, select to plot, live vs historical, time window, sampling rate.
- Project journey: milestones/phases, meetings (agenda/status), support contacts.
- Optimization/components: grid of systems with status/severity; click to drill into analyses.
- Component detail: related tasks, analyses cards (schedule correlation, setpoint deviation, sensor functionality, control loop, dynamic control, etc.), multi-signal time series with sampling control, datapoint table with stats.
- Recommendations: list with severity, component, quick detail links.
- Checklist/Tasks: actionable items with assignee, recommended/implemented dates, status, comments.
- Metering: main/sub meters with cost, CO₂, energy per period.
- Faults/alerts: severity, component, link to tasks/actions.

## Unique UX differentiators we will add
- Thermal comfort heatmaps on floor plans; animated over time.
- Energy flow Sankey with animated particles.
- Interactive what-if scenario builder (strategy toggles + sliders with live chart updates).
- Before/After overlay with scrub slider.
- Health score radar with drill-down.
- Fault timeline (“event river”) with cost-of-inaction.
- M&V explainer (baseline vs adjusted vs actual with CI).
- Strategy cards with live savings counters and control logic diagrams.
- 3D building with floor highlights tied to data layers (later via R3F).
