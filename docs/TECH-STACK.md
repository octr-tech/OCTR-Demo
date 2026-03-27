# Tech Stack — OCTR Energy Demo

## Framework & Styling
- **Next.js (React)** — primary framework.
- **Tailwind CSS** — utility styling with our CSS variables.
- **shadcn/ui** — component primitives; theme overridden via `tokens.css`.
- **Font**: Plus Jakarta Sans (Google Fonts).

## Charts
- **Primary**: Chart.ts (`@chartts/react`) — 65+ types, Tailwind-native, dark mode friendly.
- **Advanced**: Apache ECharts (`echarts`, `echarts-for-react`) — heatmaps, Sankey, parallel coords; themed via `design-system/chart-theme.json`.
- **Basic/Integrated**: shadcn Charts (Recharts) for quick KPIs.
- **Animation**: Framer Motion for hover/entry.

## 3D & Maps
- **3D detail**: React Three Fiber (`@react-three/fiber`, `@react-three/drei`), `gltf-exploder` for exploded/cutaway and floor selection.
- **3D fallback**: Sketchfab Viewer API (fast embed + annotations).
- **Portfolio map**: Mapbox GL JS (`react-map-gl`), fill-extrusion buildings; optional Threebox for GLTF on map.
- **Future BIM**: Speckle viewer (optional), ThatOpen/Fragments (optional).

## State / Data
- Synthetic dataset (seeded JSON/TS) with adapter interface; later swap to real BAS/BEMS.
- Minimal server routes for Anthropic calls (if using Claude narratives).

## UI Add-ons
- Icons: Lucide/Tabler.
- Date/time: date-fns.
- Form: React Hook Form + Zod (for typed forms).

## Installation (after Next.js scaffold)
```bash
npm install tailwindcss postcss autoprefixer @tailwindcss/typography
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot
npm install @chartts/react echarts echarts-for-react recharts
npm install @react-three/fiber @react-three/drei gltf-exploder
npm install react-map-gl
npm install framer-motion
npm install lucide-react date-fns
npm install react-hook-form zod
```

## Rationale
- **Chart.ts** for beautiful defaults + breadth; **ECharts** for complex visuals; **shadcn/Recharts** for quick KPI blocks.
- **R3F** gives full control and integration with our theme; Sketchfab for speed if needed.
- **Mapbox 3D** for “from above” portfolio context; matches the Brainbox map storyline.
- Tailwind + shadcn lets us express the design system quickly with minimal bespoke CSS.
