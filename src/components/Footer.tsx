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
      <div className="footerLink"
        style={{
          position: isHome ? "fixed" : 'relative',
          color: (isAbout || isWork ) ? "black" : "white",          
        }}
      >
        <p style={{gridColumn: '1 / span 1'}}><a href="https://www.instagram.com/giadabossi" 
        target="_blank" rel="noopener noreferrer">Instagram</a> </p>
        <p style={{gridColumn: '2 / span 1'}}><a>Vimeo</a> </p>
        <TimeIT />
      </div>
    </header>
  );
}