import { MarqueeTrack } from "@/components/ui/MarqueeTrack";

const BRANDS =
  "· VERTEX ANALYTICS · AURA WELLNESS · PULSE AI · FORMA STUDIO · MERIDIAN TECH · CREST CAPITAL · LUMINARY BRANDS · ORBIT SYSTEMS · PRISM MEDIA · ZENITH CO ·";

export function LogoMarqueeSection() {
  return (
    <section
      id="clients"
      className="!py-0 bg-bg-primary"
      style={{ minHeight: 140 }}
    >
      <p className="py-6 text-center font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-text-muted">
        BRANDS WE&apos;VE BUILT FOR
      </p>
      <div className="border-y border-[var(--divider)] py-5">
        <MarqueeTrack duration={35}>
          <span className="px-4 font-sans text-sm font-medium tracking-[0.2em] text-text-muted">
            {BRANDS}
          </span>
        </MarqueeTrack>
      </div>
    </section>
  );
}
