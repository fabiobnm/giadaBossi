"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  embedUrl: string;
  title?: string;
  isPortrait?: boolean;
};

export default function VideoPlayerClient({
  embedUrl,
  title,
  isPortrait,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [larghezzaAgg, setLarghezzaAgg] = useState<number | null>(null);
  const [altezzaAgg, setAltezzaAgg] = useState<number | null>(null);
  const [ratio, setRatio] = useState(16 / 9);

  // MOBILE CHECK
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // VIMEO INIT
  useEffect(() => {
    if (!iframeRef.current) return;

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      const player = new window.Vimeo.Player(iframeRef.current);
      playerRef.current = player;

      player.setVolume(0);
      player.play();

      // READY
      player.on("loaded", async () => {
        const w = await player.getVideoWidth();
        const h = await player.getVideoHeight();
        const r = w / h;

        console.log('width '+w);

                console.log('height '+h);


        setRatio(r);

        const update = () => {
          const vh = window.innerHeight;
          const vw = window.innerWidth;

          setLarghezzaAgg((vh - 20) * r);
          setAltezzaAgg((vw - 20) / r);
        };

        update();
        window.addEventListener("resize", update);

        // cleanup resize
        return () => window.removeEventListener("resize", update);
      });

      // duration
      player.getDuration().then((d: number) => setDuration(d));

      // progress
      player.on("timeupdate", (data: any) => {
        setCurrentTime(data.seconds);
        setProgress(data.percent * 100);
      });
    };

    document.body.appendChild(script);

    return () => {
      playerRef.current?.unload?.();
    };
  }, []);

  const togglePlay = async () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      await playerRef.current.pause();
    } else {
      await playerRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleAudio = async () => {
    if (!playerRef.current) return;

    await playerRef.current.setVolume(isMuted ? 1 : 0);
    setIsMuted(!isMuted);
  };

  const goFullscreen = async () => {
    if (!playerRef.current) return;

    await playerRef.current.requestFullscreen();
    await playerRef.current.play();
    await playerRef.current.setVolume(1);

    setIsMuted(false);
    setIsPlaying(true);
  };

  const seek = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    await playerRef.current.setCurrentTime(percent * duration);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      className="tuttoVideo"
      style={{
        position: "relative",
        width: "100%",
        zIndex: 9999,
        background: isPortrait ? "none" : "black",
      }}
    >
      <iframe
        ref={iframeRef}
        src={`${embedUrl}?background=1&loop=1&byline=0&title=0`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={
          isPortrait
            ? {
                width: "100%",
                height: isMobile
                  ? `${altezzaAgg ?? 0}px`
                  : "calc(100vh - 20px)",
                border: 0,
                marginTop: "10px",
              }
            : {
                width: "100%",
                aspectRatio: ratio,
                border: 0,
                marginTop: "10px",
              }
        }
      />

      {isPortrait 
     ?
      <div className="buttonContainer"
        style={{
          position: "absolute",
          paddingInline: "10px",
          bottom:5,
          display: "grid",
          gap: "10px",
          zIndex: 10,
          mixBlendMode:'difference',
          color:'#f2f1f1',
          gridTemplateColumns: 'repeat(7, 1fr)',
          width:  isMobile ? "100%" : (larghezzaAgg ?? "100%"),
          fontSize:'12px',
          left:'50%',
          transform:'translateX(-50%)'
        }}
      >
        <button style={{gridColumn:' 1 / span 1', textAlign:'left', cursor:'pointer'}} onClick={togglePlay}>
          {isPlaying ? "⏸︎\u00A0\u00A0\u00A0Pause" : "⏵\u00A0\u00A0\u00A0Play"}
        </button>
         {/* PROGRESS BAR */}
      <div
        onClick={seek}
        style={{
            position: "absolute",
          bottom: '4.5px',
          left: 0,
          width: "100%",
          height: "4px",
          background: "rgba(255,255,255,0.2)",
          cursor: "pointer",
          zIndex: 20,
          gridColumn:' 2 / span 3'
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            marginBottom:'20px',
            background: "#f2f1f1",
          }}
        />
      </div>
       <button style={{gridColumn:' 5 / span 1', cursor:'pointer'}} onClick={toggleAudio}>
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button style={{gridColumn:' 6 / span 1', cursor:'pointer'}} onClick={goFullscreen}>Fullscreen</button>
        {/* TIME */}
        <p style={{ gridColumn: "7 / span 1", textAlign: "right" , fontSize:'12px'}}>
            {formatTime(currentTime)} 
        </p>
      
      </div>
     :  /*  ORIZZONTALE ORIZZONTALE ORIZZONTALE ORIZZONTALE ORIZZONTALE ORIZZONTALE ORIZZONTALE ORIZZONTALE ORIZZONTALE ORIZZONTALE */
      <div className="buttonContainer"
        style={{
          position: "absolute",
          paddingInline: "10px",
          bottom:5,
          display: "grid",
          gap: "10px",
          zIndex: 10,
         /* mixBlendMode:'difference', */
          color:'#f2f1f1',
          gridTemplateColumns: 'repeat(7, 1fr)',
          width:'100%',
          fontSize:'12px'
        }}
      >
        <button style={{gridColumn:' 1 / span 1', textAlign:'left', cursor:'pointer'}} onClick={togglePlay}>
          {isPlaying ? "⏸︎\u00A0\u00A0\u00A0Pause" : "⏵\u00A0\u00A0\u00A0Play"}
        </button>
         {/* PROGRESS BAR */}
      <div
        onClick={seek}
        style={{
            position: "absolute",
          bottom: '4.5px',
          left: 0,
          width: "100%",
          height: "4px",
          background: "rgba(255,255,255,0.2)",
          cursor: "pointer",
          zIndex: 20,
          gridColumn:' 2 / span 3'
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            marginBottom:'20px',
            background: "#f2f1f1",
          }}
        />
      </div>
       <button style={{gridColumn:' 5 / span 1', cursor:'pointer'}} onClick={toggleAudio}>
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button style={{gridColumn:' 6 / span 1', cursor:'pointer'}} onClick={goFullscreen}>Fullscreen</button>
        {/* TIME */}
        <p style={{ gridColumn: "7 / span 1", textAlign: "right" , fontSize:'12px'}}>
            {isMobile
            ? formatTime(currentTime)
            : `${formatTime(currentTime)} / ${formatTime(duration)}`}
        </p>
      
      </div>
      }
    </div>
  );
}