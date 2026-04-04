'use client';

import { CONTACT_ME } from "../../lib/constants";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  Zap,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Inline SVGs for brand icons
const GitHubSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socialLinks = [
  {
    name: "Email",
    Icon: MailSVG,
    getHref: () => CONTACT_ME.email ? `mailto:${CONTACT_ME.email}` : "#",
    label: "samirkadu8@gmail.com",
    description: "Drop me a line",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    hoverBg: "hover:bg-red-100 dark:hover:bg-red-900/30",
    external: false,
  },
  {
    name: "LinkedIn",
    Icon: LinkedInSVG,
    getHref: () => CONTACT_ME.linkedin ?? "#",
    label: "linkedin.com/in/sameer-kadu",
    description: "Connect professionally",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
    external: true,
  },
  {
    name: "GitHub",
    Icon: GitHubSVG,
    getHref: () => CONTACT_ME.github ?? "#",
    label: "github.com/Sameer-Kadu",
    description: "Explore my code",
    bg: "bg-gray-50 dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
    iconColor: "text-gray-700 dark:text-gray-300",
    hoverBg: "hover:bg-gray-100 dark:hover:bg-gray-700",
    external: true,
  },
];

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Replace with your Formspree endpoint or email service
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all duration-200 text-sm";
  const inputIdle = "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500";
  const inputFocused = "border-blue-500 dark:border-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/30";

  const getInputClass = (field: string) =>
    `${inputBase} ${focusedField === field ? inputFocused : inputIdle}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/60 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100/60 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {CONTACT_ME.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {CONTACT_ME.description}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* ── Contact Form ── */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Send me a message</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">
                I read every message and reply within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Rahul Sharma"
                      className={getInputClass("name")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@company.com"
                      className={getInputClass("email")}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Hiring / Collaboration / Just saying hi"
                    className={getInputClass("subject")}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell me about the opportunity or project..."
                    className={`${getInputClass("message")} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {submitStatus && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${
                      submitStatus === "success"
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700"
                        : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    {submitStatus === "success"
                      ? "Message sent! I'll get back to you soon."
                      : "Something went wrong. Please email me directly."}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* ── Contact info + social ── */}
          <div className={`space-y-5 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {/* Quick info */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { Icon: MapPin, label: "Location", value: CONTACT_ME.location, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
                  { Icon: Clock, label: "Response Time", value: CONTACT_ME.responseTime, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                  { Icon: Zap, label: "Availability", value: CONTACT_ME.availability, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
                ].map(({ Icon, label, value, color, bg }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl ${bg}`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Find me online</h3>
              <div className="space-y-3">
                {socialLinks.map(({ name, Icon, getHref, label, description, bg, border, iconColor, hoverBg, external }) => (
                  <a
                    key={name}
                    href={getHref()}
                    target={external ? "_blank" : "_self"}
                    rel={external ? "noopener noreferrer" : ""}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${bg} ${border} ${hoverBg} transition-all duration-200 cursor-pointer group`}
                  >
                    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white dark:bg-gray-700 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{label}</p>
                    </div>
                    <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors">
                      {description}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA note */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white">
              <p className="font-bold text-lg mb-1">Open to new opportunities</p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Full-time roles, freelance contracts, and technical collaborations. Let's build something great.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
