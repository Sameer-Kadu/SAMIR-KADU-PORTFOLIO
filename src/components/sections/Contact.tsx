"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { CONTACT } from "@/content";
import { SITE, SOCIAL } from "@/content/site";
import { childVariants, inViewOnce, staggerVariants } from "@/lib/motion";
import Module from "@/components/system/Module";

const CHANNELS = [
  {
    name: "Email",
    handle: SOCIAL.email,
    href: `mailto:${SOCIAL.email}`,
    Icon: Mail,
    external: false,
  },
  {
    name: "LinkedIn",
    handle: SOCIAL.linkedinHandle,
    href: SOCIAL.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    name: "GitHub",
    handle: SOCIAL.githubHandle,
    href: SOCIAL.github,
    Icon: Github,
    external: true,
  },
];

/**
 * Contact.
 *
 * The composer builds a `mailto:` draft rather than pretending to submit to a
 * backend that does not exist — the message really does reach an inbox, and the
 * button says exactly what it will do.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);

  const mailtoHref = () => {
    const subject = form.subject.trim() || "Hello from your portfolio";
    const body = [form.message.trim(), form.name.trim() && `\n— ${form.name.trim()}`]
      .filter(Boolean)
      .join("\n");
    return `mailto:${SOCIAL.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permission denied — the address is visible either way.
    }
  };

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Module
      id="contact"
      index="06"
      code="contact"
      title={CONTACT.title}
      lead={CONTACT.description}
      sunken
    >
      <motion.div
        variants={staggerVariants(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-8"
      >
        {/* ── Direct channels ── */}
        <motion.div variants={childVariants} className="flex flex-col gap-5">
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
            {CHANNELS.map(({ name, handle, href, Icon, external }) => (
              <li key={name}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  data-cursor={external ? "external" : undefined}
                  className="tap group flex items-center gap-3.5 px-4 py-3.5 transition-colors duration-fast hover:bg-ink/[0.03]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-ink-3 transition-colors duration-fast group-hover:text-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.875rem] font-medium text-ink">{name}</span>
                    <span className="block truncate font-mono-tech text-[0.6875rem] text-ink-3">
                      {handle}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>

          {/* Status */}
          <dl className="rounded-xl border border-line bg-panel p-5">
            <div className="flex items-start gap-3 pb-4">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line">
                <span className="status-dot" />
              </span>
              <div>
                <dt className="tech-label">status</dt>
                <dd className="mt-1 text-[0.875rem] font-medium text-ink">
                  {CONTACT.availability}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-line py-4">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line text-ink-3">
                <Clock className="h-3.5 w-3.5" />
              </span>
              <div>
                <dt className="tech-label">response time</dt>
                <dd className="mt-1 text-[0.875rem] text-ink-2">{CONTACT.responseTime}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-line pt-4">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line text-ink-3">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <div>
                <dt className="tech-label">location</dt>
                <dd className="mt-1 text-[0.875rem] text-ink-2">{SITE.location}</dd>
              </div>
            </div>
          </dl>

          <button type="button" onClick={copyEmail} className="btn btn-ghost w-full">
            {copied ? <Check className="h-4 w-4 text-live" /> : <Copy className="h-4 w-4" />}
            {copied ? "Address copied" : "Copy email address"}
          </button>
        </motion.div>

        {/* ── Composer ── */}
        <motion.div
          variants={childVariants}
          className="rounded-xl border border-line bg-panel p-6 md:p-8"
        >
          <div className="mb-1.5 flex items-center gap-2.5">
            <span className="tech-label">compose</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <p className="mb-6 text-[0.8125rem] leading-relaxed text-ink-3">
            Fill this in and it opens a pre-written draft in your own mail app — nothing is sent
            from this page.
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-[0.8125rem] font-medium text-ink-2"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={update("name")}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className="h-11 w-full rounded-lg border border-line bg-bg px-3.5 text-[0.875rem] text-ink outline-none transition-colors duration-fast placeholder:text-ink-3 focus:border-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-[0.8125rem] font-medium text-ink-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Role, project or idea"
                  className="h-11 w-full rounded-lg border border-line bg-bg px-3.5 text-[0.875rem] text-ink outline-none transition-colors duration-fast placeholder:text-ink-3 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-[0.8125rem] font-medium text-ink-2"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={form.message}
                onChange={update("message")}
                placeholder="A few lines about what you're building or hiring for."
                className="w-full resize-y rounded-lg border border-line bg-bg px-3.5 py-3 text-[0.875rem] leading-relaxed text-ink outline-none transition-colors duration-fast placeholder:text-ink-3 focus:border-accent"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="btn btn-primary">
                <Mail className="h-4 w-4" />
                Open draft in mail app
              </button>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                className="btn btn-ghost"
              >
                Download résumé
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </Module>
  );
}
