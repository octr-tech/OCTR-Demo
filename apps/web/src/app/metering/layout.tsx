import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy Metering — OCTR",
  description: "G-Valley energy metering dashboard — combined, electricity, and gas views.",
};

export default function MeteringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#070a0f]">{children}</div>
  );
}
