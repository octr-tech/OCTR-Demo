export default function MeteringPage() {
  return (
    <div className="relative min-h-0 min-w-0 flex-1">
      <iframe
        title="Energy Metering — G Valley"
        src="/dashboards/energy-metering/index.html"
        className="absolute inset-0 h-full w-full border-0 bg-[#0b0f14]"
      />
    </div>
  );
}
