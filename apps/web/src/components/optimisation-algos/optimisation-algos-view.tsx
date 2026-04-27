"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  catalogInScope,
  excludedForGValley,
  floorModel,
  heroStrategies,
  strategies,
} from "@/data/g-valley-optimisation-strategies";
import { SectionCard } from "@/components/optimisation-algos/section-card";
import { GValleyPlantSchematic } from "@/components/optimisation-algos/g-valley-plant-schematic";
import { GValleyAhuSchematic } from "@/components/optimisation-algos/g-valley-ahu-schematic";
import { OssTimelineDemo } from "@/components/optimisation-algos/demos/oss-timeline-demo";
import { DeadBandDemo } from "@/components/optimisation-algos/demos/dead-band-demo";
import { MasterSatDemo } from "@/components/optimisation-algos/demos/master-sat-demo";
import { ChillerStagingDemo } from "@/components/optimisation-algos/demos/chiller-staging-demo";
import { DsprDemo } from "@/components/optimisation-algos/demos/dspr-demo";

const heroBodies: Record<number, string> = {
  1: "Latest feasible AHU and plant start based on inertia, weather, and occupancy — fewer idle kWh before people arrive.",
  2: "Keep heating and cooling from fighting the same zone; widen proportional and dead bands where controls allow.",
  3: "Blend VAV cooling requests instead of always tracking the worst zone (high select).",
  4: "Hold CHP-1-2 offline until block load and electrical draw prove the second absorption machine is warranted.",
  5: "Reset duct static pressure so the most-open VAV rides near 90–95% instead of every box being over-pressured.",
};

const demoByNumber: Record<number, ReactNode> = {
  1: <OssTimelineDemo />,
  2: <DeadBandDemo />,
  3: <MasterSatDemo />,
  4: <ChillerStagingDemo />,
  5: <DsprDemo />,
};

export function OptimisationAlgosView() {
  const inScopeCount = strategies.filter((s) => s.inScopeGValley).length;
  const totalStrategies = strategies.length;
  const heroCount = heroStrategies.length;
  const excludedCount = excludedForGValley.length;

  return (
    <div className="mx-auto min-w-0 max-w-[1700px] space-y-10 px-8 pb-16 pt-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-xl font-semibold text-[var(--text)]">G Valley · Optimisation Algos</h1>
          <span className="text-[11px] font-medium text-[var(--primary-bright)] bg-[rgba(82,183,136,0.1)] px-2 py-0.5 rounded-full border border-[rgba(82,183,136,0.25)]">
            Demo narrative
          </span>
        </div>
        <p className="text-[13px] text-[var(--text-muted)] max-w-3xl leading-relaxed">
          Interactive explanations for{" "}
          <span className="text-[var(--text)] font-medium">{inScopeCount}</span> strategies that apply to Guro G Valley
          in this engagement. Plant and AHU schematics are stylised from your BMS topology — not live SCADA.
        </p>
        <p className="text-[12px] text-[var(--text-faint)]">
          {floorModel.officeFloors} occupied floors + {floorModel.basementFloors.length} basement levels ·{" "}
          {floorModel.ahuCount} AHUs · geothermal heating {floorModel.geothermalHeatingFloors}
        </p>
        <p className="text-[12px] text-[var(--text-muted)] max-w-3xl leading-relaxed">
          The plant schematic, AHU diagram, full 20-strategy list, and five interactive strips are below — scroll past
          the summary card. From{" "}
          <span className="text-[var(--text)] font-medium">Optimization (DB-5)</span>, use the{" "}
          <span className="text-[var(--text)] font-medium">G Valley demos</span> tab; or open{" "}
          <span className="text-[var(--text)] font-medium">Optimisation Algos</span> in the sidebar (dashboard tools).
        </p>
      </header>

      <SectionCard
        title="Strategy coverage (at a glance)"
        description="Quick counts so the narrative stays grounded in the full catalogue."
        badge="Summary"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-white/[0.06] bg-black/10 px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-foreground-faint">Total strategies</div>
            <div className="mt-1 text-[18px] font-semibold text-foreground tabular-nums">{totalStrategies}</div>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-black/10 px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-foreground-faint">In scope (G Valley)</div>
            <div className="mt-1 text-[18px] font-semibold text-[var(--primary-bright)] tabular-nums">
              {inScopeCount}
            </div>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-black/10 px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-foreground-faint">Interactive demos</div>
            <div className="mt-1 text-[18px] font-semibold text-foreground tabular-nums">{heroCount}</div>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-black/10 px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-foreground-faint">Out of scope</div>
            <div className="mt-1 text-[18px] font-semibold text-foreground tabular-nums">{excludedCount}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/[0.06] bg-black/10 px-4 py-3">
          <div>
            <div className="text-[11px] text-foreground font-medium">AHU visualisation</div>
            <div className="text-[11px] text-foreground-muted">
              For the full AHU performance view (timelines, duct pressure, economy cycle), open Systems → Air.
            </div>
          </div>
          <Link
            href="/systems/air"
            className="text-[12px] text-[var(--primary-bright)] hover:underline font-medium"
          >
            Open AHU dashboard
          </Link>
        </div>
      </SectionCard>

      <SectionCard
        title="Water-side plant schematic"
        description="Two absorption CHP machines (seasonal chiller or boiler), two cooling-tower groups, geothermal for low floors, headers and secondary pumps, and a separate DHW loop."
        badge="Topology"
      >
        <GValleyPlantSchematic />
      </SectionCard>

      <SectionCard
        title="Representative AHU (airside)"
        description="AHU-19 style topology: upper return deck with return fan and EA tee, vertical mixing damper, lower outdoor-air deck with E/H, filters, separate H and C faces, CHR valve, supply fan, and SA — matching the legacy BAS airside layout."
        badge={`${floorModel.ahuCount} AHUs on site`}
      >
        <GValleyAhuSchematic />
      </SectionCard>

      <SectionCard
        title="Full strategy list (20)"
        description="Everything in the catalogue, with what’s included in the G Valley scope flagged."
        badge="Registry"
      >
        <ul className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-md overflow-hidden">
          {strategies.map((s) => (
            <li
              key={s.guideNumber}
              className="px-3 py-2.5 flex flex-col gap-1 bg-black/10 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-foreground-faint tabular-nums">#{s.guideNumber}</span>
                <span className="text-[13px] text-foreground font-medium">{s.title}</span>
                {s.hero ? (
                  <span className="text-[10px] rounded px-1.5 py-0.5 border border-[rgba(101,212,161,0.25)] bg-[rgba(101,212,161,0.12)] text-[var(--primary-bright)]">
                    demo
                  </span>
                ) : null}
                {s.inScopeGValley ? (
                  <span className="text-[10px] rounded px-1.5 py-0.5 border border-white/[0.08] bg-white/[0.04] text-foreground-muted">
                    in scope
                  </span>
                ) : (
                  <span className="text-[10px] rounded px-1.5 py-0.5 border border-[rgba(229,115,115,0.18)] bg-[rgba(229,115,115,0.08)] text-[#f2b5b5]">
                    out of scope
                  </span>
                )}
              </div>
              <p className="text-[11px] text-foreground-muted sm:max-w-[52%] sm:text-right">{s.shortLine}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="space-y-6">
        <h2 className="text-[11px] font-semibold text-foreground-faint uppercase tracking-widest">
          Five demonstration strips
        </h2>
        {heroStrategies.map((s) => (
          <SectionCard
            key={s.guideNumber}
            title={`#${s.guideNumber} — ${s.title}`}
            description={heroBodies[s.guideNumber] ?? s.shortLine}
            badge="Interactive"
          >
            <p className="text-[12px] text-foreground-muted mb-4 leading-relaxed">{s.shortLine}</p>
            {demoByNumber[s.guideNumber]}
          </SectionCard>
        ))}
      </div>

      <SectionCard
        title="Out of scope for this G Valley storyline"
        description="These items are excluded from this demo dashboard by project boundary — not a comment on their value elsewhere."
        badge="Transparency"
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-foreground-muted">
          {excludedForGValley.map((s) => (
            <li
              key={s.guideNumber}
              className="rounded-md border border-white/[0.06] bg-black/15 px-3 py-2 flex gap-2"
            >
              <span className="text-foreground-faint tabular-nums">#{s.guideNumber}</span>
              <span>{s.title}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard
        title="Also in scope (catalog)"
        description="Concise list of additional optimisations for G Valley without duplicate heavy visuals here."
        badge="Reference"
      >
        <ul className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-md overflow-hidden">
          {catalogInScope.map((s) => (
            <li key={s.guideNumber} className="px-3 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-black/10">
              <div>
                <span className="text-[10px] text-foreground-faint mr-2">#{s.guideNumber}</span>
                <span className="text-[13px] text-foreground font-medium">{s.title}</span>
              </div>
              <p className="text-[11px] text-foreground-muted sm:max-w-[55%] sm:text-right">{s.shortLine}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link
            href="/optimization/scorecard"
            className="text-[12px] text-[var(--primary-bright)] hover:underline font-medium"
          >
            Open DB-5 Strategy Scorecard for full 20-strategy analytics
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
