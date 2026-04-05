"use client";

import { Mail, Linkedin, Github, Heart } from "lucide-react";
import { CONTACT_ME } from "../../lib/constants";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0A0E1A] border-t border-gray-100 dark:border-white/[0.06] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-heading font-semibold text-gray-900 dark:text-white">
              Samir Kadu
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Built with{" "}
              <Heart className="w-3 h-3 text-red-500 inline mx-0.5" aria-hidden="true" />
              Next.js & Tailwind
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CONTACT_ME.email}`}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_ME.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_ME.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {year} Samir Kadu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
