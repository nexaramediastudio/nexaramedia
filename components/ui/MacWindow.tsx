"use client";

import { ReactNode } from "react";

type MacWindowProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

export function MacWindow({ title, className = "", children }: MacWindowProps) {
  return (
    <div className={`mac-window ${className}`}>
      <div className="mac-window-titlebar">
        <div className="mac-traffic-lights" aria-hidden>
          <span className="mac-light mac-light-red" />
          <span className="mac-light mac-light-yellow" />
          <span className="mac-light mac-light-green" />
        </div>
        <span className="mac-window-title">{title}</span>
      </div>
      <div className="mac-window-body">{children}</div>
    </div>
  );
}
