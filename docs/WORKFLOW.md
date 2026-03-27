# Workflow — Cursor & Claude

## Providers
- In Cursor, select **Anthropic API** provider and set your API key for Claude models (large context).
- Claude Code CLI (optional) for batch generation (strategy pages, data stubs).

## Working pattern
1. Open the relevant spec file (design-system, dashboard spec, etc.).
2. Chat in Cursor with that file referenced; ask for targeted edits.
3. For bigger batches (e.g., generate all strategy detail pages), use Claude Code CLI with the spec file as context.
4. Keep changes small and iterative; run lint/format after each chunk.

## Agents / sub-tasks
- Give each agent a single dashboard spec file (e.g., `specs/dashboards/03-energy-analytics.md`) plus `design-system` tokens for visual guidance.
- For 3D work: provide R3F starter component + chosen GLTF model path + the gltf-exploder pattern.
- For charts: include `design-system/chart-theme.json` and chart styling rules from `design-system/design-system.md`.

## Order of implementation
1) Layout + design-system demo page.  
2) Portfolio overview (Mapbox) + KPI cards.  
3) Building detail (Sketchfab embed first).  
4) Energy analytics + datapoints explorer.  
5) Comfort heatmap.  
6) Equipment/components + faults/recommendations/tasks.  
7) Strategy library.  
8) M&V explainer.  
9) Scenario builder.  
10) Emissions/carbon.  
11) Controls/schedules.  
12) Upgrade 3D to R3F with floor selection/exploded view.

## Testing / QA
- Visual check against design-system demo page.
- Charts: verify gradients, tooltips, annotations.
- Responsiveness: cards stack cleanly, sidebar collapses.
- 3D: orbit/zoom, floor selection, performance (optimize GLTF).
- Map: marker interactions and building focus work at target coordinates.
