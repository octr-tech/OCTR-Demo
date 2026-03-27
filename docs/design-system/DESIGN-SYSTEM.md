# Design System — OCTR Energy Demo

## Brand & Theme
- **Palette**: Dark forest/matcha. Background `#0A0F0D`, surface `#111B16`, hover `#1A2B22`, primary `#2D6A4F`, accent `#52B788`, glow `#40916C`, text `#E8F5E9`, text-muted `#A7C4B5`, danger `#E57373`.
- **Gradients**: Hero `linear-gradient(135deg, rgba(13,31,18,0.92), rgba(45,106,79,0.85))`; Chart fill `linear-gradient(180deg, rgba(82,183,136,0.4) 0%, rgba(82,183,136,0) 100%)`.
- **Typography**: Plus Jakarta Sans (heading + body). Backup: Inter.
- **Radii**: Default 6px (Supabase-like), sm 4px, lg 12px.
- **Shadows/Glow**: Soft drop shadow + subtle 1px border; hover glow `rgba(64,145,108,0.25)`; line glow `drop-shadow(0 0 6px rgba(82,183,136,0.5))`.
- **Transitions**: 200–300ms ease; hover lifts by 1px, adds glow.

## Components (visual rules)
- **Cards**: Flat + border; hover adds glow; padding 16–20px; title + meta row; optional subtitle. Use muted dividers (rgba 255,255,255,0.06).
- **KPI cards**: Title, value, delta w/ arrow, tiny sparkline; status pill (green/red); optional icon.
- **Panels/Side drawers**: Slide-in from right; width 420–480px; persistent header (title, status, dates, assignee), body scrollable; sticky footer for actions.
- **Tabs/Filters**: Minimal underline; active tab uses primary; hover underline fades in.
- **Buttons**: Primary = solid primary; Ghost = border + hover glow; Destructive = danger.
- **Tables**: Dense mode allowed; zebra off; row hover uses `rgba(82,183,136,0.06)`; sticky headers; compact padding 10–12px.
- **Forms/inputs**: Dark surfaces, subtle border, focus ring in primary.
- **Badges**: Pill 18–20px height; severity colors (danger, warning, info, success=primary-bright).

## Charts (publishable quality)
- **Color discipline**: Max 3–4 hues: primary, primary-bright, muted green, danger for faults. No rainbow.
- **Gradients**: Area fills use chart gradient; bars can use vertical gradient; pies use adjacent tints.
- **Lines**: Monotone curves; apply line glow.
- **Axes**: No bounding box; faint gridlines (`rgba(255,255,255,0.04)`); axis labels muted.
- **Legends vs annotations**: Prefer labels/annotations on chart over legend boxes. Mark events (e.g., “Optimization ON”, “Fault detected”).
- **Tooltips**: Custom dark card; rounded 6px; show units; small sparkline optional.
- **Animation**: Subtle 300–500ms on enter; no bounce.
- **Specials**:
  - Heatmaps: Narrow color ramp from deep green to bright; no rainbow.
  - Sankey: Use green spectrum for flows; red only for loss/waste.
  - Gauges: Thick arc; green progress; background arc muted.
  - Radar: Transparent fill with light gradient; strong outline; axis labels muted.

## Micro-interactions (Supabase-inspired)
- Hover: border glow and slight lift on cards/buttons.
- Icons: Micro-animations on hover (scale 1.05, rotate 2deg).
- Cursor-follow glow (optional) on hero/cards for “alive” feel.
- Page transitions: Fade + slight slide for side panels/drawers.

## Layout
- **Grid**: 12-column; gutters 20–24px. Use 2–3 cards per row on desktop, stack on mobile.
- **Spacing**: 8pt scale (4/8/12/16/20/24/32/40).
- **Navigation**: Left sidebar with icons + labels; optional collapse. Header with mode toggle (Owner/FM/Engineer) and filters.

## Design references (anchors)
- Supabase (hover/micro-interactions, clean dark UI).
- WindPulse (chart styling, data-dense but clear).
- Orion UI Kit (infographic-quality charts).
- Sourceful Energy (energy-specific components).
- Brainbox/Aedifion (content depth, not visual style).

## Accessibility
- Contrast: Text on surfaces >= WCAG AA.
- Hit targets: 40px height minimum for interactive elements.
- Motion: Respect reduced-motion; disable hover glows/animations when set.

## Implementation hints
- Tailwind CSS with CSS variables from `tokens.css`.
- shadcn/ui as base components; override theme with our variables.
- Charts: Chart.ts for most; ECharts with custom theme for heatmap/Sankey/parallel coords; shadcn/Recharts for simple KPIs.
- Animations: Framer Motion for hover/entry; keep durations consistent.
