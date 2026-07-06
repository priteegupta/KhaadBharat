import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAppStore } from "../../app/store/useAppStore";

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useAppStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { key: "home", label: t("ui.nav.home"), path: "/" },
    { key: "about", label: t("ui.nav.about"), path: "/about" },
    { key: "product", label: t("ui.nav.product"), path: "/products" },
    { key: "media", label: t("ui.nav.media"), path: "/media" },
    { key: "weather", label: t("ui.nav.weather"), path: "/weather" },
    { key: "schemes", label: t("ui.nav.schemes"), path: "/schemes" },
    { key: "faq", label: t("ui.nav.faq"), path: "/faq" },
    { key: "connect", label: t("ui.nav.connect"), path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-beige-panel/90 backdrop-blur-md shadow-md py-3 border-b border-brand-green/10"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand logo & subtitle */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img
                className="w-10 h-10 object-contain drop-shadow"
                src="/images/logo-mark.png"
                alt="KHAAD BHARAT Logo"
              />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-wide text-brand-green-deep leading-none uppercase">
                  Khaad Bharat
                </span>
                <span className="hidden sm:block text-[10px] font-semibold text-brand-brown-warm tracking-tight leading-none mt-1">
                  {t("brand.tagline")}
                </span>
              </div>
            </div>

            {/* Center: Desktop links */}
            <div className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-brand-green text-white shadow-sm"
                        : "text-brand-text/80 hover:text-brand-green hover:bg-brand-green/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Right: Language switcher & CTA */}
            <div className="hidden xl:flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-extrabold text-white bg-brand-green-deep hover:bg-brand-green shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("ui.connect.title", "Connect with Team")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-brand-green-deep hover:bg-brand-green/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-0 top-[73px] bg-brand-text/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-brand-beige-panel shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-brand-green/10 pb-4">
                  <span className="font-extrabold text-brand-green-deep uppercase tracking-wider">
                    {t("ui.nav.navigation")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full text-brand-text/60 hover:bg-brand-green/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.key}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `px-4 py-3 rounded-xl text-base font-bold transition-all ${
                          isActive
                            ? "bg-brand-green text-white"
                            : "text-brand-text hover:bg-brand-green/5 hover:text-brand-green"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-brand-green/10 pt-6">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/contact");
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-base font-extrabold text-white bg-brand-green-deep hover:bg-brand-green shadow-lg transition-all duration-300"
                >
                  {t("ui.connect.title", "Connect with Team")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Spacer to push content below sticky navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
