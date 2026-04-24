import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "OCTR — Energy Optimization Platform",
  description: "Building energy optimization and fault detection dashboard for facility managers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} h-dvh max-h-dvh overflow-hidden`}>
      <body className="font-sans m-0 h-dvh max-h-dvh min-h-0 overflow-hidden antialiased">
        <div className="flex h-full min-h-0 w-full overflow-hidden">
          <Sidebar />
          {/*
            Column flex so routes can use flex-1 + min-h-0 (e.g. full-height iframe) without growing
            the document past the viewport.
          */}
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
