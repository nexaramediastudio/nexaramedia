import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] px-6 py-12 md:px-[clamp(24px,6vw,100px)]"
      style={{ background: "#050505" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="font-sans text-sm font-medium tracking-[0.3em] text-text-primary">
            NEXARA MEDIA
          </span>
          <nav className="flex flex-wrap gap-6">
            {["Services", "Work", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase() === "services" ? "services" : item.toLowerCase()}`}
                className="font-sans text-xs font-light text-text-muted transition-colors hover:text-text-primary"
              >
                {item}
              </Link>
            ))}
          </nav>
          <a
            href="mailto:nexaramediastudio@gmail.com"
            className="font-sans text-xs font-light text-text-muted transition-colors hover:text-text-primary"
          >
            nexaramediastudio@gmail.com
          </a>
        </div>

        <div className="my-8 h-px bg-[var(--divider)]" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="font-sans text-[11px] font-normal text-text-secondary">
              Available for new projects
            </span>
          </div>
          <div className="flex gap-4 font-sans text-xs text-text-muted">
            <a
              href="https://www.instagram.com/nexaramediastudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/18gLjUTbY6/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              Facebook
            </a>
            <a
              href="https://wa.me/94711137748"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="my-8 h-px bg-[var(--divider)]" />

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[11px] text-text-muted">
            © 2025 Nexara Media. All rights reserved.
          </p>
          <p className="font-sans text-[11px] italic text-text-muted">
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
