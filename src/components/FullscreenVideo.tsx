"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  width?: number;
  height?: number;
};

type Dimensions = {
  width: number;
  height: number;
  top: number;
  left: number;
};

function coverDimensions(
  childW: number,
  childH: number,
  containerW: number,
  containerH: number
) {
  const scaleFactor = Math.max(containerW / childW, containerH / childH);

  const width = Math.ceil(childW * scaleFactor);
  const height = Math.ceil(childH * scaleFactor);

  return {
    width,
    height,
    top: (containerH - height) * 0.5,
    left: (containerW - width) * 0.5,
  };
}

export default function FullscreenVideo({
  src,
  width = 16,
  height = 9,
}: Props) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    function sizeEverything() {
      const nextDimensions = coverDimensions(
        width,
        height,
        window.innerWidth,
        window.innerHeight
      );

      setDimensions(nextDimensions);
    }

    sizeEverything();

    window.addEventListener("resize", sizeEverything);

    return () => {
      window.removeEventListener("resize", sizeEverything);
    };
  }, [width, height]);

  return (
    <div
      className="fullscreeneo-wrap"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <div
        className="fullscreeneo-video-container"
        style={{
          position: "absolute",
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          top: `${dimensions.top}px`,
          left: `${dimensions.left}px`,
          maxWidth: "none",
        }}
      >
        <iframe
          data-fullscreeneo
          src={src}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </div>
    </div>
  );
}