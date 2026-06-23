import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Award,
  MapPin,
  HelpCircle as QuestionIcon,
  ChevronDown,
  Lock
} from "lucide-react";
import useSchemes from "../hooks/useSchemes";
import SEO from "../../../components/common/SEO";

// Fallback AlertCircle component
const AlertCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const SchemeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation("schemes");
  const { data: schemes = [], isLoading } = useSchemes();
  const navigate = useNavigate();

  const scheme = schemes.find((s) => s.slug === slug || s.id === slug);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-pulse flex flex-col gap-8">
        <div className="h-6 w-32 bg-gray-200 rounded-full" />
        <div className="h-12 w-3/4 bg-gray-200 rounded-2xl" />
        <div className="h-4 w-1/2 bg-gray-200 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-gray-200 rounded-3xl col-span-2" />
          <div className="h-40 bg-gray-200 rounded-3xl" />
        </div>
        <div className="h-64 bg-gray-200 rounded-3xl" />
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
        <AlertCircle className="w-16 h-16 text-rose-500" />
        <h2 className="text-2xl font-black text-brand-green-deep">
          {t("detailLabels.notFound")}
        </h2>
        <p className="text-sm font-semibold text-brand-text-muted">
          {t("detailLabels.notFoundDesc")}
        </p>
        <button
          onClick={() => navigate("/schemes")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-green text-white font-bold hover:bg-brand-green-deep transition-all text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("detailLabels.backToSchemes")}
        </button>
      </div>
    );
  }

  // Formatting date
  const formattedVerifyDate = (() => {
    if (!scheme.lastVerifiedDate) return "";
    try {
      const [year, month, day] = scheme.lastVerifiedDate.split("-");
      return `${day}/${month}/${year}`;
    } catch {
      return scheme.lastVerifiedDate;
    }
  })();

  const getStateLabel = (stateKey: string) => {
    return t(`states.${stateKey}`, { defaultValue: stateKey });
  };

  const getCategoryLabel = (catKey: string) => {
    return t(`categories.${catKey}`, { defaultValue: catKey });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-8 md:gap-12">
      <SEO title={`${scheme.title} | KHAAD BHARAT`} description={scheme.description} />

      {/* 1. BREADCRUMBS & BACK BUTTON */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-brand-text-muted overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-green transition-colors">
            {t("common:ui.nav.home")}
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link to="/schemes" className="hover:text-brand-green transition-colors">
            {t("common:ui.nav.schemes")}
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-brand-green-deep font-extrabold">{scheme.title}</span>
        </div>

        <button
          onClick={() => navigate("/schemes")}
          className="inline-flex items-center gap-2 text-xs font-black text-brand-green-deep hover:text-brand-green transition-all self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("detailLabels.backToSchemes")}
        </button>
      </div>

      {/* 2. HEADER BLOCK (Trust Banner, Badge, Title) */}
      <div className="relative p-6 md:p-10 rounded-3xl bg-white border border-brand-green/10 shadow-premium flex flex-col gap-6 overflow-hidden">
        {/* Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-green via-brand-accent-sunlight to-brand-green" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black text-brand-green bg-brand-green-light border border-brand-green/10">
              <Award className="w-3.5 h-3.5" />
              {getCategoryLabel(scheme.category)}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-brand-text bg-brand-beige border border-brand-brown/10">
              {scheme.governmentType === "central" ? t("cardLabels.govCentral") : t("cardLabels.govState")}
            </span>
            {scheme.governmentType === "state" && scheme.state && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold text-brand-brown bg-brand-accent-soft">
                <MapPin className="w-3 h-3" />
                {getStateLabel(scheme.state)}
              </span>
            )}
          </div>

          {/* Status Badge */}
          {scheme.status && (
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black border ${
                scheme.status === "active"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : scheme.status === "upcoming"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : scheme.status === "expired"
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  scheme.status === "active"
                    ? "bg-emerald-500 animate-pulse"
                    : scheme.status === "upcoming"
                    ? "bg-amber-500 animate-bounce"
                    : scheme.status === "expired"
                    ? "bg-rose-500"
                    : "bg-blue-500"
                }`}
              />
              {scheme.status === "active"
                ? t("cardLabels.statusActive")
                : scheme.status === "upcoming"
                ? t("cardLabels.statusUpcoming")
                : scheme.status === "expired"
                ? t("cardLabels.statusExpired")
                : t("cardLabels.statusReview")}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-brand-green-deep tracking-tight leading-tight">
            {scheme.title}
          </h1>
          <p className="text-sm md:text-base text-brand-text-muted leading-relaxed font-semibold">
            {scheme.description}
          </p>
        </div>

        {/* Verification Alert Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-500/10 text-xs md:text-sm font-bold text-emerald-800">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{t("detailLabels.verifiedScheme")}</span>
          </span>
          {formattedVerifyDate && (
            <span className="text-brand-text-muted text-xs">
              {t("detailLabels.lastVerified")} {formattedVerifyDate}
            </span>
          )}
        </div>
      </div>

      {/* 3. CORE SCHEME DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Overview, Eligibility, Documents, Process) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Benefits Summary Section */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-black text-brand-green-deep border-b border-brand-green/5 pb-2">
              {t("detailLabels.schemeBenefits")}
            </h2>
            <div className="p-5 rounded-2xl bg-brand-green-light/20 border border-brand-green/10">
              <span className="text-sm font-black text-brand-green-deep tracking-tight leading-snug">
                {scheme.benefits}
              </span>
            </div>
            {scheme.supportType && (
              <p className="text-xs text-brand-text font-bold">
                {t("detailLabels.supportCategory")}{" "}
                <span className="text-brand-green font-black">{scheme.supportType}</span>
              </p>
            )}
          </div>

          {/* Eligibility Checklist Section */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-black text-brand-green-deep border-b border-brand-green/5 pb-2">
              {t("detailLabels.eligibilityCriteria")}
            </h2>
            <ul className="flex flex-col gap-3">
              {scheme.eligibility.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-xs md:text-sm text-brand-text font-bold leading-relaxed">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {scheme.farmerTypes && (
              <div className="flex flex-wrap items-center gap-2 mt-2 pt-4 border-t border-brand-green/5">
                <span className="text-xs font-black text-brand-green-deep">
                  {t("detailLabels.targetFarmerTypes")}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.farmerTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-0.5 rounded text-[10px] font-black bg-brand-green-light text-brand-green-deep border border-brand-green/10"
                    >
                      {t(`farmerTypes.${type}`, { defaultValue: type })}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Required Documents Section */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-black text-brand-green-deep border-b border-brand-green/5 pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-green" />
              {t("detailLabels.requiredDocuments")}
            </h2>
            <p className="text-xs font-bold text-brand-text-muted">
              {t("detailLabels.documentsPrepareNote")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {scheme.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-brand-beige-cream/30 border border-brand-green/5 text-xs text-brand-text font-bold"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Application Process Section */}
          {scheme.process && (
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-4">
              <h2 className="text-lg font-black text-brand-green-deep border-b border-brand-green/5 pb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-green" />
                {t("detailLabels.applicationProcess")}
              </h2>
              <div className="p-4 rounded-2xl bg-brand-beige/20 border border-brand-green/5 text-xs md:text-sm text-brand-text font-bold leading-relaxed">
                {scheme.process}
              </div>
            </div>
          )}

          {/* FAQ Accordion Section */}
          {scheme.faqs && scheme.faqs.length > 0 && (
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-4">
              <h2 className="text-lg font-black text-brand-green-deep border-b border-brand-green/5 pb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-green" />
                {t("detailLabels.schemeFaqs")}
              </h2>
              <div className="flex flex-col gap-4 mt-2">
                {scheme.faqs.map((faq, index) => (
                  <div key={index} className="flex flex-col gap-2 p-4 rounded-2xl border border-brand-green/5 bg-brand-beige-cream/10">
                    <h3 className="text-xs md:text-sm font-black text-brand-green-deep flex items-start gap-2">
                      <span className="bg-brand-green text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">Q</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed font-bold pl-7 border-t border-brand-green/5 pt-2 mt-1">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Action Center, Compliance, Assistance) */}
        <div className="flex flex-col gap-8">
          
          {/* Action Center Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-brand-green-deep text-white border border-brand-green/15 shadow-premium relative overflow-hidden flex flex-col gap-5">
            {/* Visual Accent */}
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-brand-green-light/10 pointer-events-none" />

            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-black tracking-tight">
                {t("detailLabels.applicationCenter")}
              </h3>
              <p className="text-xs text-brand-beige-cream font-bold leading-normal">
                {t("detailLabels.applicationsPortalNote")}
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-brand-beige-cream/80 font-black tracking-wider">
                  {t("detailLabels.officialPortal")}
                </span>
                <span className="text-xs font-black underline truncate">
                  {scheme.officialWebsite}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-brand-beige-cream/80 font-black tracking-wider">
                  {t("detailLabels.verifiedSource")}
                </span>
                <span className="text-xs font-black">
                  {scheme.officialSource}
                </span>
              </div>
            </div>

            <a
              href={scheme.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-black text-brand-green-deep bg-brand-accent-sunlight hover:bg-brand-accent-sunlight/90 hover:scale-[1.02] active:scale-100 transition-all shadow-md"
            >
              {t("detailLabels.applyOnPortal")}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Compliance Disclaimer */}
          <div className="p-6 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-4 text-xs font-bold leading-relaxed text-brand-text-muted">
            <div className="flex items-center gap-2 border-b border-brand-green/5 pb-2 text-brand-green-deep font-black">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t("detailLabels.securityDisclaimer")}</span>
            </div>
            <p className="text-brand-green-deep font-extrabold">
              {t("detailLabels.portalProcessNote")}
            </p>
            <p>
              {t("detailLabels.trustNoteDesc")}
            </p>
          </div>

          {/* Helpline Desk Assistance */}
          <div className="p-6 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-4 text-xs font-bold text-brand-text">
            <div className="flex items-center gap-2 border-b border-brand-green/5 pb-2 text-brand-green-deep font-black text-sm">
              <QuestionIcon className="w-4 h-4 text-brand-green" />
              <span>{t("detailLabels.needAssistance")}</span>
            </div>
            <p className="text-brand-text-muted">
              {t("detailLabels.assistanceDesc")}
            </p>
            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-brand-green/20 hover:bg-brand-green-light/40 text-brand-green font-black transition-colors"
            >
              {t("detailLabels.contactHelpDesk")}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};



export default SchemeDetailPage;
