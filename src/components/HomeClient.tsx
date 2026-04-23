"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import type { Commercial } from "@/lib/queries/commercials";
import { Narrative } from "@/lib/queries/narratives";

type Props = {
  commercials: Commercial[];
  narratives: Narrative[];
};

export default function HomeClient({ commercials, narratives }: Props) {
  const { dark } = useTheme();
  const { left } = useTheme();

  return (
    <div>
     <Header commercials={commercials} narratives={narratives} />

    <div
      className={`homeBg min-h-screen flex flex-col transition-colors duration-300 ${
        dark  ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{opacity:(dark || left) ? 0 : 1,
        transition: 'opacity 1s',
        transitionDelay:'1s',
        position: 'absolute',
        width: '100vW',
        top: 0
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vH",
          backdropFilter: (dark || left) ? "blur(80px)" : "blur(0px)",
          transition: "1.5s",
        }}
      ></div>

      <main className="">
      </main>

      <Footer />
    </div>
    </div>
  );
}