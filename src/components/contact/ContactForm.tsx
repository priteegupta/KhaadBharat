import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../app/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Heart, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactFormProps {
  selectedInterest: string;
  setSelectedInterest: (value: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  selectedInterest,
  setSelectedInterest,
}) => {
  const { t } = useTranslation("contact");
  const { lang, addEnquiry } = useAppStore();

  const activeLanguageLabel = lang === "en" ? "English" : "हिन्दी";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Synchronize initial interest state
  const interestOptions = ["product", "farmer", "dealer", "partnership", "media", "other"];

  const stateKeys = [
    "andhra_pradesh", "arunachal_pradesh", "assam", "bihar", "chhattisgarh", "delhi_ncr",
    "goa", "gujarat", "haryana", "himachal_pradesh", "jharkhand", "karnataka", "kerala",
    "madhya_pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland",
    "odisha", "punjab", "rajasthan", "sikkim", "tamil_nadu", "telangana", "tripura",
    "uttar_pradesh", "uttarakhand", "west_bengal", "other"
  ];

  const updateField = (field: string, value: string) => {
    setForm((curr) => ({ ...curr, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = t("form.validation.nameRequired");
    }

    if (!form.phone.trim()) {
      newErrors.phone = t("form.validation.phoneRequired");
    } else if (!/^\d{10}$/.test(form.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = t("form.validation.phoneInvalid");
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("form.validation.emailInvalid");
    }

    if (!form.state) {
      newErrors.state = t("form.validation.stateRequired");
    }

    if (!form.message.trim()) {
      newErrors.message = t("form.validation.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const dataToSave = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        state: t(`form.states.${form.state}`),
        interest: t(`form.interests.${selectedInterest}`),
        language: activeLanguageLabel,
        message: form.message,
      };

      addEnquiry(dataToSave);
      setSubmittedData(dataToSave);
      setSuccess(true);
      setIsSubmitting(false);

      // Reset form fields
      setForm({
        name: "",
        phone: "",
        email: "",
        state: "",
        message: "",
      });
      setSelectedInterest("farmer");
    }, 1200);
  };

  return (
    <div id="contact-form-section" className="scroll-mt-24 bg-white rounded-[32px] border border-brand-green/10 shadow-premium p-6 md:p-10 relative overflow-hidden">
      {/* Decorative colored bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-green-light via-brand-green to-brand-green-deep" />

      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-black text-brand-green-deep tracking-tight">
          {t("form.title")}
        </h3>
        <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1.5">
          {t("form.subtitle")}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col items-center justify-center text-center py-10 px-6 bg-brand-green-light/20 rounded-2xl border border-brand-green/15"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-white mb-5 shadow-lg shadow-brand-green/20"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <h4 className="text-xl font-black text-brand-green-deep mb-2">
              {t("form.successTitle")}
            </h4>
            <p className="text-xs md:text-sm font-bold text-brand-text mb-8 max-w-md leading-relaxed">
              {t("form.successDesc")}
            </p>

            {submittedData && (
              <div className="w-full max-w-md bg-white rounded-2xl border border-brand-green/10 p-5 text-left text-xs md:text-sm text-brand-text font-bold flex flex-col gap-3 shadow-sm relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-green/5 rounded-bl-full pointer-events-none" />
                <div className="flex justify-between border-b border-brand-green/5 pb-2.5">
                  <span className="text-brand-text-muted">{t("form.nameLabel")}:</span>
                  <span className="text-brand-green-deep">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-brand-green/5 pb-2.5">
                  <span className="text-brand-text-muted">{t("form.phoneLabel")}:</span>
                  <span className="text-brand-green-deep">{submittedData.phone}</span>
                </div>
                {submittedData.email && (
                  <div className="flex justify-between border-b border-brand-green/5 pb-2.5">
                    <span className="text-brand-text-muted">{t("form.emailLabel")}:</span>
                    <span className="text-brand-green-deep">{submittedData.email}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-brand-green/5 pb-2.5">
                  <span className="text-brand-text-muted">{t("form.stateLabel")}:</span>
                  <span className="text-brand-green-deep">{submittedData.state}</span>
                </div>
                <div className="flex justify-between border-b border-brand-green/5 pb-2.5">
                  <span className="text-brand-text-muted">{t("form.interestLabel")}:</span>
                  <span className="text-brand-green-deep">{submittedData.interest}</span>
                </div>
                <div className="pt-1 mt-1 font-semibold leading-relaxed">
                  <span className="text-brand-text-muted font-bold block mb-1.5">{t("form.messageLabel")}:</span>
                  <p className="text-xs text-brand-text/90 bg-brand-beige-cream/15 border border-brand-green/5 rounded-xl p-3 font-semibold">
                    {submittedData.message}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setSuccess(false)}
              className="mt-8 px-7 py-3 rounded-full text-xs md:text-sm font-black text-white bg-brand-green hover:bg-brand-green-deep transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("form.sendAnother")}
            </button>
          </motion.div>
        ) : (
          <form key="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1.5">
                  {t("form.nameLabel")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-text/45 transition-colors group-focus-within:text-brand-green">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder={t("form.namePlaceholder")}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-full border ${
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-brand-green/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    } focus:outline-none bg-brand-beige-cream/5 text-sm font-semibold text-brand-text transition-all duration-300 shadow-sm`}
                  />
                </div>
                {errors.name && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-2.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1.5">
                  {t("form.phoneLabel")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-text/45">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder={t("form.phonePlaceholder")}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-full border ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-brand-green/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    } focus:outline-none bg-brand-beige-cream/5 text-sm font-semibold text-brand-text transition-all duration-300 shadow-sm`}
                  />
                </div>
                {errors.phone && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-2.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1.5">
                  {t("form.emailLabel")}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-text/45">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder={t("form.emailPlaceholder")}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-full border ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-brand-green/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    } focus:outline-none bg-brand-beige-cream/5 text-sm font-semibold text-brand-text transition-all duration-300 shadow-sm`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-2.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* State Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="state" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1.5">
                  {t("form.stateLabel")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-text/45">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <select
                    id="state"
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className={`w-full pl-11 pr-10 py-3.5 rounded-full border ${
                      errors.state
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-brand-green/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    } focus:outline-none bg-brand-beige-cream/5 text-sm font-semibold text-brand-text appearance-none cursor-pointer transition-all duration-300 shadow-sm`}
                  >
                    <option value="" disabled>{t("form.stateSelect")}</option>
                    {stateKeys.map((key) => (
                      <option key={key} value={key}>{t(`form.states.${key}`)}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-text/45">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {errors.state && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-2.5 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.state}
                  </span>
                )}
              </div>
            </div>

            {/* Inquiry Type / Interest */}
            <div className="flex flex-col gap-2">
              <label htmlFor="interest" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1.5">
                {t("form.interestLabel")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-text/45">
                  <Heart className="w-4 h-4" />
                </span>
                <select
                  id="interest"
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="w-full pl-11 pr-10 py-3.5 rounded-full border border-brand-green/20 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 bg-brand-beige-cream/5 text-sm font-semibold text-brand-text appearance-none cursor-pointer transition-all duration-300 shadow-sm"
                >
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`form.interests.${opt}`)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-text/45">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1.5">
                {t("form.messageLabel")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-4 text-brand-text/45">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={t("form.messagePlaceholder")}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-brand-green/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                  } focus:outline-none bg-brand-beige-cream/5 text-sm font-semibold text-brand-text resize-none transition-all duration-300 shadow-sm`}
                />
              </div>
              {errors.message && (
                <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-2.5 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-black text-white ${
                isSubmitting
                  ? "bg-brand-green/60 cursor-not-allowed"
                  : "bg-brand-green-deep hover:bg-brand-green hover:shadow-lg hover:shadow-brand-green/20 hover:scale-[1.01] active:scale-[0.99]"
              } transition-all duration-300 mt-2 shadow-md`}
            >
              {isSubmitting ? t("form.submitting") : t("form.submitBtn")}
              {!isSubmitting && <Send className="w-4 h-4 animate-pulse" />}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
