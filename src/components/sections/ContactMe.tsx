"use client";

import { CONTACT_ME } from "../../lib/constants";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  AlertCircle,
} from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    Icon: Mail,
    href: `mailto:${CONTACT_ME.email}`,
    label: CONTACT_ME.email,
    description: "Drop me a line",
    color: "hover:border-red-200 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/5",
    iconColor: "text-red-500",
  },
  {
    name: "LinkedIn",
    Icon: Linkedin,
    href: CONTACT_ME.linkedin,
    label: "sameer-kadu",
    description: "Connect professionally",
    color: "hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "GitHub",
    Icon: Github,
    href: CONTACT_ME.github,
    label: "Sameer-Kadu",
    description: "See my code",
    color: "hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10",
    iconColor: "text-gray-800 dark:text-gray-200",
  },
];

const ContactMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-gray-50/80 dark:bg-[#0D1120] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-600/10 border border-brand-200 dark:border-brand-600/20 text-brand-700 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Contact
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {CONTACT_ME.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl text-base">
            {CONTACT_ME.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left column — info + social links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Quick info */}
            <div className="rounded-3xl p-7 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark">
              <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-5">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-0.5">
                      Location
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {CONTACT_ME.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-0.5">
                      Response Time
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {CONTACT_ME.responseTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-0.5">
                      Status
                    </p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {CONTACT_ME.availability}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-3xl p-7 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark">
              <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-5">
                Find me on
              </h3>
              <div className="space-y-3">
                {socialLinks.map(({ name, Icon, href, label, description, color, iconColor }) => (
                  <a
                    key={name}
                    href={href}
                    target={name !== "Email" ? "_blank" : undefined}
                    rel={name !== "Email" ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-transparent transition-all duration-200 cursor-pointer group ${color}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <Icon className={`w-4.5 h-4.5 ${iconColor}`} style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{description}</p>
                    </div>
                    <span className="ml-auto text-xs text-gray-400 dark:text-gray-600 truncate max-w-[100px]">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl p-7 sm:p-8 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.07] shadow-card-light dark:shadow-card-dark h-full">
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">
                Send a message
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-7">
                Have a project in mind? Tell me about it.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, role, or idea..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    isSubmitting
                      ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "bg-brand-600 hover:bg-brand-700 text-white shadow-glow-sm hover:shadow-glow-md"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Message sent! I&apos;ll get back to you within 24 hours.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-medium"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please email me directly instead.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
