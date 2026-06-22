"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import appIcon from "@/app/icon.png";

function formatLiveTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function MobileStatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatLiveTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mobile-status-bar" aria-label="Site status">
      <Link href="#hero" className="mobile-status-bar__brand">
        <Image
          src={appIcon}
          alt=""
          width={22}
          height={22}
          className="mobile-status-bar__logo"
          priority
        />
        <span className="mobile-status-bar__name">NEXARA</span>
      </Link>

      <div className="mobile-status-bar__live">
        <span className="mobile-status-bar__live-dot" aria-hidden />
        <span className="mobile-status-bar__live-text">LIVE • {time || "—"}</span>
      </div>
    </div>
  );
}
