"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { PROFILE, STORY } from "@/content/profile";
import { JOURNEY } from "@/content/journey";
import { PROJECTS } from "@/content/projects";
import { DOMAINS } from "@/content/domains";
import { ACHIEVEMENTS } from "@/content/achievements";
import { SITE, SOCIAL } from "@/content/site";
import { CONTACT } from "@/content";
import { DESTINATION_BY_ID, type DestinationId } from "@/lib/explorer/journey";
import { useExplorer } from "@/lib/explorer/store";
import { EASE } from "@/lib/motion";

const label = "font-mono text-[9px] uppercase tracking-[0.2em] text-white/35";
const chip =
  "rounded border border-white/12 px-1.5 py-0.5 font-mono text-[10px] text-white/60";

/* ── Per-destination bodies, all reading from the shared content modules ── */

function Origin() {
  return (
    <div className="space-y-6">
      <p className="text-[13px] leading-relaxed text-white/70">{PROFILE.bio}</p>
      <ol className="space-y-5">
        {STORY.map((c, i) => (
          <li key={c.key} className="flex gap-3.5">
            <span className="mt-0.5 font-mono text-[10px] text-[#5c98ff]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className={label}>{c.label}</p>
              <p className="mt-1 text-[13px] font-medium text-white/90">{c.heading}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">{c.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Career() {
  return (
    <ol className="space-y-6">
      {JOURNEY.map((e) => (
        <li key={e.title} className="border-l border-white/12 pl-4">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <p className="text-[14px] font-semibold text-white">{e.title}</p>
            {e.badge && <span className={chip}>{e.badge}</span>}
            <span className="ml-auto font-mono text-[10px] text-white/40">{e.duration}</span>
          </div>
          <p className="mt-0.5 text-[12px] text-[#5c98ff]">{e.org}</p>
          <p className="mt-2 text-[12px] leading-relaxed text-white/60">{e.description}</p>
          <ul className="mt-2.5 space-y-1.5">
            {e.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[11.5px] leading-relaxed text-white/55">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5c98ff]" />
                {h}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function Projects() {
  const [open, setOpen] = useState(PROJECTS[0]?.id ?? "");

  return (
    <div className="space-y-3">
      {PROJECTS.map((p) => {
        const expanded = open === p.id;
        return (
          <div key={p.id} className="overflow-hidden rounded-lg border border-white/12">
            <button
              type="button"
              onClick={() => setOpen(expanded ? "" : p.id)}
              aria-expanded={expanded}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04]"
            >
              <span className="font-mono text-[10px] text-[#5c98ff]">{p.index}</span>
              <span className="flex-1">
                <span className="block text-[13.5px] font-semibold text-white">{p.title}</span>
                <span className="block text-[11.5px] text-white/50">{p.tagline}</span>
              </span>
              <span className={`text-white/40 transition-transform ${expanded ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 border-t border-white/10 px-4 py-4">
                    {p.caseStudy.map((s, i) => (
                      <div key={s.title}>
                        <p className={label}>
                          {String(i + 1).padStart(2, "0")} · {s.title}
                        </p>
                        {s.body && (
                          <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">
                            {s.body}
                          </p>
                        )}
                        {s.points && (
                          <ul className="mt-1.5 space-y-1">
                            {s.points.map((pt) => (
                              <li
                                key={pt}
                                className="flex gap-2.5 text-[11.5px] leading-relaxed text-white/55"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5c98ff]" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {p.architecture && (
                      <div>
                        <p className={label}>architecture</p>
                        <ol className="mt-2 space-y-2">
                          {p.architecture.map((a, i) => (
                            <li key={a.tier} className="flex gap-3">
                              <span className="mt-0.5 font-mono text-[9px] text-[#5c98ff]">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <p className="text-[12px] font-medium text-white/85">{a.tier}</p>
                                <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/50">
                                  {a.role}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    <div>
                      <p className={label}>stack</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {p.techStack.map((t) => (
                          <li key={t} className={chip}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[12px] text-white/70 hover:text-white"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Source
                        </a>
                      )}
                      {p.demoLink && (
                        <a
                          href={p.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[12px] text-[#5c98ff] hover:text-[#8bb6ff]"
                        >
                          Live demo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Tech() {
  return (
    <div className="space-y-5">
      {DOMAINS.map((d) => (
        <section key={d.id}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded border border-white/15 font-mono text-[9px] text-white/60">
              {d.code}
            </span>
            <h4 className="text-[13px] font-semibold text-white">{d.label}</h4>
            <span className="ml-auto font-mono text-[10px] text-white/30">{d.tech.length}</span>
          </div>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/50">{d.summary}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {d.tech.map((t) => (
              <li key={t.name} className={chip}>
                {t.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Vault() {
  return (
    <ul className="space-y-4">
      {ACHIEVEMENTS.map((a) => (
        <li key={a.id} className="rounded-lg border border-white/12 p-4">
          <div className="flex items-baseline gap-2.5">
            <span className={chip}>{a.label}</span>
            <span className="ml-auto font-mono text-[10px] text-white/40">{a.year}</span>
          </div>
          <p className="mt-2 text-[13.5px] font-semibold text-white">{a.title}</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">{a.detail}</p>
        </li>
      ))}
    </ul>
  );
}

function Uplink() {
  const channels = [
    { name: "Email", handle: SOCIAL.email, href: `mailto:${SOCIAL.email}` },
    { name: "LinkedIn", handle: SOCIAL.linkedinHandle, href: SOCIAL.linkedin },
    { name: "GitHub", handle: SOCIAL.githubHandle, href: SOCIAL.github },
    { name: "Résumé", handle: "PDF", href: SITE.resume },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5 rounded-lg border border-[#5c98ff]/30 bg-[#5c98ff]/[0.07] px-4 py-3">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#5c98ff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5c98ff]">
          connection established
        </span>
      </div>

      <p className="text-[13px] leading-relaxed text-white/70">{CONTACT.description}</p>

      <ul className="space-y-2">
        {channels.map((c) => (
          <li key={c.name}>
            <a
              href={c.href}
              target={c.name === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-white/12 px-4 py-3 transition-colors hover:border-[#5c98ff]/40 hover:bg-white/[0.03]"
            >
              <span className="flex-1">
                <span className="block text-[13px] font-medium text-white">{c.name}</span>
                <span className="block font-mono text-[11px] text-white/45">{c.handle}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </li>
        ))}
      </ul>

      <dl className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
        {[
          ["status", CONTACT.availability],
          ["response", CONTACT.responseTime],
          ["location", SITE.location],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className={label}>{k}</dt>
            <dd className="mt-1 text-[12px] text-white/65">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const BODIES: Record<DestinationId, () => React.JSX.Element> = {
  origin: Origin,
  career: Career,
  projects: Projects,
  tech: Tech,
  vault: Vault,
  uplink: Uplink,
};

/**
 * Content console for the selected destination.
 *
 * Everything here is rendered from the same `src/content` modules that feed
 * Engineer View — Explorer View never holds its own copy of the portfolio.
 */
export default function DestinationPanel() {
  const { destination, setDestination } = useExplorer();
  const active = destination ? DESTINATION_BY_ID[destination] : null;
  const Body = destination ? BODIES[destination] : null;

  return (
    <AnimatePresence>
      {active && Body && (
        <motion.aside
          key={active.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4, ease: EASE }}
          aria-label={`${active.name} — ${active.section}`}
          className="pointer-events-auto absolute right-6 top-1/2 z-30 flex max-h-[76vh] w-[26rem] -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-white/12 bg-black/70 backdrop-blur-xl"
        >
          <header className="flex items-start gap-3 border-b border-white/10 px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] text-[#5c98ff]">{active.index}</span>
                <span className={label}>{active.section}</span>
              </div>
              <h3 className="mt-1 text-[17px] font-semibold text-white">{active.name}</h3>
              <p className="mt-0.5 text-[12px] text-white/50">{active.tagline}</p>
            </div>
            <button
              type="button"
              onClick={() => setDestination(null)}
              aria-label="Close and return to the outpost"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/15 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="scroll-slim min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <Body />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
