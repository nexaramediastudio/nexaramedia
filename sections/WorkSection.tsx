"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/gsap";

const PROJECTS = [
  {
    title: "Vertex Dashboard",
    tag: "Business Systems · 2024",
    bg: "#0A1A14",
    size: "large",
  },
  {
    title: "Aura Brand Identity",
    tag: "Branding · 2024",
    bg: "#1A1208",
    size: "small",
  },
  {
    title: "Pulse AI Interface",
    tag: "AI Automation · Web Dev · 2024",
    bg: "#0A0F1A",
    size: "small",
  },
  {
    title: "Forma Digital Experience",
    tag: "Digital Experiences · 2024",
    bg: "#161616",
    size: "medium",
  },
];

function ProjectCard({
  project,
  className = "",
}: {
  project: (typeof PROJECTS)[0];
  className?: string;
}) {
  return (
    <article
      data-work-card
      data-cursor="card"
      className={`soft-card group relative overflow-hidden ${className}`}
      style={{ background: project.bg }}
    >
      <div className="relative aspect-video w-full transition-transform duration-500 group-hover:scale-[1.04]">
        <div className="absolute inset-4 rounded-lg border border-[var(--border)] bg-bg-card/40 p-4">
          <div className="mb-3 h-2 w-12 rounded bg-gold/20" />
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 h-20 rounded bg-bg-card-hover/60" />
            <div className="h-20 rounded bg-[rgba(15,61,46,0.4)]" />
            <div className="col-span-3 h-10 rounded bg-bg-card-hover/40" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-[rgba(8,8,8,0)] p-6 transition-all duration-500 group-hover:bg-[rgba(8,8,8,0.7)]">
        <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="font-display text-2xl text-text-primary">
            {project.title}
          </h3>
          <p className="mt-1 font-sans text-xs text-text-muted">{project.tag}</p>
          <span className="mt-4 inline-block font-sans text-sm text-gold">
            View Project →
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity group-hover:opacity-0">
        <h3 className="font-display text-xl text-text-primary">{project.title}</h3>
        <p className="font-sans text-xs text-text-muted">{project.tag}</p>
      </div>
    </article>
  );
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll("[data-work-card]");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 50 });
      setTimeout(() => observer.observe(card), i * 100);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="bg-bg-primary">
      <SectionLabel number="04" title="SELECTED WORK" className="mb-12" />

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text-primary"
            style={{ fontSize: "var(--text-display)" }}
          >
            <span className="block">Work we&apos;re</span>
            <span className="block">proud of.</span>
          </h2>
          <div className="md:text-right">
            <p className="font-sans text-base font-light text-text-secondary">
              A few things we&apos;ve built. More available on request.
            </p>
            <Link
              href="#contact"
              className="mt-2 inline-block font-sans text-sm text-gold"
              data-cursor="link"
            >
              See more work →
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProjectCard project={PROJECTS[0]} className="lg:col-span-2 lg:row-span-1" />
          <ProjectCard project={PROJECTS[1]} />
          <ProjectCard project={PROJECTS[2]} />
          <ProjectCard project={PROJECTS[3]} className="lg:col-span-2" />
        </div>
      </div>
    </section>
  );
}
