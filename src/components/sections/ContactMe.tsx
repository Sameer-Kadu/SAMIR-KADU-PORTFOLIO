'use client';

import { CONTACT_ME } from "../../lib/constants";
import { useState, useEffect, useRef } from "react";
import { MapPin, Clock, Zap, Mail } from "lucide-react";

/**
 * To activate the contact form:
 * 1. Sign up free at https://formspree.io
 * 2. Create a new form → copy the form ID (e.g. "xpzgvkab")
 * 3. Add to .env.local:  NEXT_PUBLIC_FORMSPREE_ID=xpzgvkab
 *
 * Without the env var, the button opens the user's mail client instead.
 */
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:${CONTACT_ME.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 6000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 6000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:${CONTACT_ME.email}`,
      color: "from-rose-500 to-pink-600",
      description: CONTACT_ME.email,
      external: false,
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: CONTACT_ME.linkedin,
      color: "from-blue-600 to-blue-700",
      description: "Connect professionally",
      external: true,
    },
    {
      name: "GitHub",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      href: CONTACT_ME.github,
      color: "from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800",
      description: "Browse my code",
      external: true,
    },
  ];

  const floatingLabel = (field: string, value: string) =>
    `absolute left-4 transition-all duration-300 pointer-events-none ${
      focusedField === field || value
        ? '-top-2 text-xs bg-white dark:bg-gray-800 px-2 text-blue-600 dark:text-blue-400 font-semibold'
        : 'top-4 text-gray-400 dark:text-gray-500 text-sm'
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-gradient-to-br from-gray-50/80 via-blue-50/80 to-purple-50/80 dark:from-gray-900/80 dark:via-slate-800/80 dark:to-indigo-900/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-5">
            <span>📬</span>
            <span>Open to work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {CONTACT_ME.title}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {CONTACT_ME.description}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="mb-7">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Send me a message</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">I read every message and reply within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="relative">
                  <label htmlFor="name" className={floatingLabel('name', formData.name)}>Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300"
                    required />
                </div>

                <div className="relative">
                  <label htmlFor="email" className={floatingLabel('email', formData.email)}>Your Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300"
                    required />
                </div>

                <div className="relative">
                  <label htmlFor="message" className={floatingLabel('message', formData.message)}>Your Message</label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 resize-none"
                    required />
                </div>

                <button
                  type="submit" disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-2xl font-semibold text-white text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed scale-100'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {FORMSPREE_ENDPOINT ? 'Send Message' : 'Open Email Client'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  )}
                </button>

                {submitStatus && (
                  <div className={`p-4 rounded-2xl text-center font-medium text-sm ${
                    submitStatus === 'success'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {submitStatus === 'success'
                      ? "✅ Message sent! I'll get back to you within 24 hours."
                      : `❌ Something went wrong. Email me directly at ${CONTACT_ME.email}`}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right panel */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Quick Info</h3>
              <div className="space-y-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, color: "from-emerald-500 to-teal-500", label: "Availability", value: CONTACT_ME.availability, pulse: true },
                  { icon: <Clock className="w-5 h-5" />, color: "from-blue-500 to-indigo-500", label: "Response Time", value: CONTACT_ME.responseTime, pulse: false },
                  { icon: <MapPin className="w-5 h-5" />, color: "from-purple-500 to-pink-500", label: "Location", value: CONTACT_ME.location, pulse: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-11 h-11 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.label}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1.5 mt-0.5">
                        {item.pulse && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                        )}
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Find me on</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href}
                    target={social.external ? '_blank' : '_self'}
                    rel={social.external ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${social.color} text-white hover:scale-[1.02] transform transition-all duration-300 hover:shadow-lg group`}
                  >
                    <div className="flex-shrink-0">{social.icon}</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{social.name}</p>
                      <p className="text-xs opacity-80 truncate">{social.description}</p>
                    </div>
                    <div className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl rotate-1 opacity-15" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 text-center">
                <div className="text-3xl mb-3">🤝</div>
                <p className="text-gray-900 dark:text-white font-bold mb-1">Let&apos;s make something great</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Whether it&apos;s a job, contract, or just a great conversation — I&apos;m in.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
