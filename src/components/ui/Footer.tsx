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
                className="w-10 h-10 object-contain brightness-0 invert"
                src="/images/logo-mark.svg"
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
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-accent-sunlight transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-accent-sunlight transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-brand-accent-sunlight transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
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
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-accent-sunlight flex-shrink-0" />
                <span className="text-sm text-white/80 font-medium leading-none">
                  +91 96259 00369
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-accent-sunlight flex-shrink-0" />
                <span className="text-sm text-white/80 font-medium leading-none">
                  info@jslenterprises.com
                </span>
              </div>
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
          <p>© {new Date().getFullYear()} JSL Enterprises. All rights reserved.</p>
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
