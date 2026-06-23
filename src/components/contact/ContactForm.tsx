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

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi (NCR)",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other"
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
        state: form.state,
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
    <div id="contact-form-section" className="scroll-mt-24 bg-white rounded-3xl border border-brand-green/10 shadow-sm p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-brand-green" />

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep tracking-tight">
          {t("form.title")}
        </h3>
        <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1">
          {t("form.subtitle")}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center py-8 px-4 bg-brand-green-light/40 rounded-2xl border border-brand-green/20"
          >
            <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-white mb-4 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-brand-green-deep mb-2">
              {t("form.successTitle")}
            </h4>
            <p className="text-xs font-bold text-brand-text mb-6 max-w-sm">
              {t("form.successDesc")}
            </p>

            {submittedData && (
              <div className="w-full max-w-md bg-white rounded-xl border border-brand-green/15 p-4 text-left text-xs text-brand-text font-bold flex flex-col gap-2 shadow-sm">
                <div><span className="text-brand-text-muted">{t("form.nameLabel")}:</span> {submittedData.name}</div>
                <div><span className="text-brand-text-muted">{t("form.phoneLabel")}:</span> {submittedData.phone}</div>
                {submittedData.email && <div><span className="text-brand-text-muted">{t("form.emailLabel")}:</span> {submittedData.email}</div>}
                <div><span className="text-brand-text-muted">{t("form.stateLabel")}:</span> {submittedData.state}</div>
                <div><span className="text-brand-text-muted">{t("form.interestLabel")}:</span> {submittedData.interest}</div>
                <div className="border-t border-brand-green/5 pt-2 mt-1 font-semibold leading-relaxed">
                  <span className="text-brand-text-muted font-bold block mb-1">{t("form.messageLabel")}:</span>
                  {submittedData.message}
                </div>
              </div>
            )}

            <button
              onClick={() => setSuccess(false)}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-black text-white bg-brand-green hover:bg-brand-green-deep transition-all duration-200"
            >
              {t("form.sendAnother")}
            </button>
          </motion.div>
        ) : (
          <form key="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
                  {t("form.nameLabel")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-text/45">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder={t("form.namePlaceholder")}
                    className={`w-full pl-11 pr-4 py-3 rounded-full border ${
                      errors.name ? "border-red-500 focus:border-red-500" : "border-brand-green/20 focus:border-brand-green"
                    } focus:outline-none bg-brand-beige-cream/10 text-sm font-semibold text-brand-text transition-colors duration-250`}
                  />
                </div>
                {errors.name && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-1 mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
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
                    className={`w-full pl-11 pr-4 py-3 rounded-full border ${
                      errors.phone ? "border-red-500 focus:border-red-500" : "border-brand-green/20 focus:border-brand-green"
                    } focus:outline-none bg-brand-beige-cream/10 text-sm font-semibold text-brand-text transition-colors duration-250`}
                  />
                </div>
                {errors.phone && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-1 mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
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
                    className={`w-full pl-11 pr-4 py-3 rounded-full border ${
                      errors.email ? "border-red-500" : "border-brand-green/20 focus:border-brand-green"
                    } focus:outline-none bg-brand-beige-cream/10 text-sm font-semibold text-brand-text transition-colors duration-250`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-1 mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* State Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="state" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
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
                    className={`w-full pl-11 pr-8 py-3 rounded-full border ${
                      errors.state ? "border-red-500" : "border-brand-green/20 focus:border-brand-green"
                    } focus:outline-none bg-brand-beige-cream/10 text-sm font-semibold text-brand-text appearance-none cursor-pointer transition-colors duration-250`}
                  >
                    <option value="" disabled>{t("form.stateSelect")}</option>
                    {states.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-text/45">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {errors.state && (
                  <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-1 mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.state}
                  </span>
                )}
              </div>
            </div>

            {/* Inquiry Type / Interest */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="interest" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
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
                  className="w-full pl-11 pr-8 py-3 rounded-full border border-brand-green/20 focus:outline-none focus:border-brand-green bg-brand-beige-cream/10 text-sm font-semibold text-brand-text appearance-none cursor-pointer"
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
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
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
                    errors.message ? "border-red-500 focus:border-red-500" : "border-brand-green/20 focus:border-brand-green"
                  } focus:outline-none bg-brand-beige-cream/10 text-sm font-semibold text-brand-text resize-none transition-colors duration-250`}
                />
              </div>
              {errors.message && (
                <span className="text-[10px] text-red-500 font-bold flex items-center gap-1 pl-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-black text-white ${
                isSubmitting ? "bg-brand-green/60 cursor-not-allowed" : "bg-brand-green-deep hover:bg-brand-green shadow-md active:scale-[0.99]"
              } transition-all duration-200 mt-2`}
            >
              {isSubmitting ? t("form.submitting") : t("form.submitBtn")}
              {!isSubmitting && <Send className="w-4 h-4" />}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
