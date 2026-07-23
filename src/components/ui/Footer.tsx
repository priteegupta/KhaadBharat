import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Leaf, Mail, Phone, MapPin } from "lucide-react";
import { useAppStore } from "../../app/store/useAppStore";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useAppStore();

  const navLinks = [
    { label: t("ui.nav.home"), path: "/" },
    { label: t("ui.nav.about"), path: "/about" },
    { label: t("ui.nav.product"), path: "/products" },
    { label: t("ui.nav.media"), path: "/media" },
  ];

  const resourceLinks = [
    { label: t("ui.nav.weather"), path: "/weather" },
    { label: t("ui.nav.schemes"), path: "/schemes" },
    { label: t("ui.nav.faq"), path: "/faq" },
  ];

  return (
    <footer className="bg-brand-green-deep text-white border-t border-brand-green/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Company Logo and Bio */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 object-contain"
                src="/images/logo-mark.png"
                alt="KHAAD BHARAT Logo"
              />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-wide uppercase leading-none">
                  Khaad Bharat
                </span>
                <span className="text-[10px] text-brand-beige-deep font-semibold tracking-tight mt-1 leading-none">
                  {t("brand.tagline", "Powered by JSL Enterprises")}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-medium">
              {t("pages.home.summary")}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.instagram.com/khaadbharat/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-accent-sunlight transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@khaadbharat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-accent-sunlight transition-colors flex items-center justify-center"
                aria-label="YouTube"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon
                    points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-accent-sunlight">
              {t("ui.footer.company")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-semibold text-white/80 hover:text-brand-accent-sunlight transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-accent-sunlight">
              {t("ui.footer.resources")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-semibold text-white/80 hover:text-brand-accent-sunlight transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-accent-sunlight">
              {t("ui.footer.contactConnect")}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-semibold">
              {t("ui.footer.intro")}
            </p>
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-accent-sunlight mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/80 font-medium leading-tight">
                  JSL Enterprises, Delhi, India
                </span>
              </div>
              <a
                href="tel:+919315314828"
                className="flex items-center gap-3 hover:text-brand-accent-sunlight transition-colors group"
              >
                <Phone className="w-4 h-4 text-brand-accent-sunlight flex-shrink-0" />
                <span className="text-sm text-white/80 group-hover:text-brand-accent-sunlight font-medium leading-none">
                  +91 93153 14828
                </span>
              </a>
              <a
                href="mailto:Jslgourav@gmail.com"
                className="flex items-center gap-3 hover:text-brand-accent-sunlight transition-colors group"
              >
                <Mail className="w-4 h-4 text-brand-accent-sunlight flex-shrink-0" />
                <span className="text-sm text-white/80 group-hover:text-brand-accent-sunlight font-medium leading-none">
                  Jslgourav@gmail.com
                </span>
              </a>
            </div>
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-black text-brand-green-deep bg-brand-accent-sunlight hover:bg-white shadow hover:scale-[1.02] transition-all duration-300"
            >
              {t("ui.connect.title", "Connect with Team")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-semibold text-white/60">
          <p>
            © {new Date().getFullYear()} JSL Enterprises. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-brand-accent-sunlight" />
            KHAAD BHARAT BIOCHAR — Powered by JSL Enterprises
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
