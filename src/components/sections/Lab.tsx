"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LAB_PERSONAL, LAB_TECHNICAL } from "@/content/lab";
import type { LabEntry } from "@/content/types";
import { childVariants, inViewOnce, staggerVariants } from "@/lib/motion";
import Module from "@/components/system/Module";

function EntryCard({ entry, muted = false }: { entry: LabEntry; muted?: boolean }) {
  return (
    <motion.article
      variants={childVariants}
      className={`flex flex-col rounded-xl border border-line p-5 transition-colors duration-med hover:border-line-strong ${
        muted ? "bg-transparent" : "bg-panel"
      }`}
    >
      <span
        className={`mb-4 grid h-9 w-9 place-items-center rounded-lg border border-line ${
          muted ? "" : "bg-bg"
        }`}
      >
        {/* These icons are monochrome black artwork — inverted so they read on
            the dark surface, and softened so they sit behind the text. */}
        <Image
          src={entry.icon}
          alt=""
          width={18}
          height={18}
          className="h-[1.125rem] w-[1.125rem] object-contain opacity-70 dark:opacity-80 dark:invert"
        />
      </span>

      <h3 className="text-[0.9375rem] font-semibold text-ink">{entry.name}</h3>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-2">{entry.description}</p>
    </motion.article>
  );
}

export default function Lab() {
  return (
    <Module
      id="lab"
      index="05"
      code="lab"
      title="What I'm reading, building and testing on my own time."
      lead="Curiosity that hasn't turned into a shipped project yet — but shapes how I think about the ones that do."
    >
      <motion.div
        variants={staggerVariants(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="tech-label">technical exploration</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAB_TECHNICAL.map((entry) => (
            <EntryCard key={entry.name} entry={entry} />
          ))}
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className="tech-label">beyond the editor</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAB_PERSONAL.map((entry) => (
            <EntryCard key={entry.name} entry={entry} muted />
          ))}
        </div>
      </motion.div>
    </Module>
  );
}
