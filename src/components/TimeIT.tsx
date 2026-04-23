"use client";

import { useEffect, useState } from "react";

export default function TimeIT() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      const formatter = new Intl.DateTimeFormat("it-IT", {
        timeZone: "Europe/Rome",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
      });

      const parts = formatter.formatToParts(now);

      const hour = parts.find(p => p.type === "hour")?.value;
      const minute = parts.find(p => p.type === "minute")?.value;
      const second = parts.find(p => p.type === "second")?.value;
      const tz = parts.find(p => p.type === "timeZoneName")?.value;

      setTime(`${hour}:${minute} ${tz} (IT)`);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p style={{gridColumn: '12 / span 1', textAlign:'right'}}>{time}</p>;
}