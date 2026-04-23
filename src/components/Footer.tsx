"use client";

import TimeIT from "@/components/TimeIT";
import { usePathname } from "next/navigation";




export default function Header() {

   const pathname = usePathname();
  const isAbout = pathname === "/about";
  const isHome = pathname === "/";
const isWork = pathname.startsWith("/work/");
  return (
    <header>
      <div
        style={{
          position: isHome ? "fixed" : 'relative',
          bottom: "0",
          padding: "10px",
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateColumns: 'repeat(12, 1fr)',
          color: (isAbout || isWork ) ? "black" : "white",
          width: "100vW",
          background: (isAbout || isWork ) ? '#f2f1f1' : "",
        }}
      >
        <p style={{gridColumn: '1 / span 1'}}>Instagram</p>
        <p style={{gridColumn: '2 / span 1'}}>Vimeo</p>
        <TimeIT />
      </div>
    </header>
  );
}