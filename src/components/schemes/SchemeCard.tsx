import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  MapPin,
  ClipboardList,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Lock,
  ArrowRight
} from "lucide-react";
import { SchemeData } from "../../features/schemes/hooks/useSchemes";
import { isValidUrl } from "../../utils/url";

interface SchemeCardProps {
  scheme: SchemeData;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const { t } = useTranslation("schemes");
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to resolve state names to translated labels
  const getStateLabel = (stateKey: string) => {
    return t(`states.${stateKey}`, { defaultValue: stateKey });
  };

  // Helper to resolve category names to translated labels
  const getCategoryLabel = (catKey: string) => {
    return t(`categories.${catKey}`, { defaultValue: catKey });
  };

  // Status Badge UI configuration
  const getStatusBadge = (status?: "active" | "upcoming" | "expired" | "review") => {
    if (!status) return null;
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("cardLabels.statusActive")}
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
            {t("cardLabels.statusUpcoming")}
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            {t("cardLabels.statusExpired")}
          </span>
        );
      case "review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {t("cardLabels.statusReview")}
          </span>
        );
      default:
        return null;
    }
  };

  // Resolve button rendering and action details
  const hasValidUrl = isValidUrl(scheme.officialWebsite);

  const renderApplyButton = () => {
    if (hasValidUrl) {
      return (
        <a
          href={scheme.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-[11px] font-black text-white bg-brand-green hover:bg-brand-green-deep transition-all shadow-sm shrink-0"
        >
          {t("cardLabels.applyNowBtn")}
          <ExternalLink className="w-3 h-3" />
        </a>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-[11px] font-black text-brand-text-muted bg-gray-100 border border-gray-200 cursor-not-allowed shrink-0">
          {t("cardLabels.infoOnly")}
        </span>
      );
    }
  };

  const eligibilityItems = Array.isArray(scheme.eligibility)
    ? scheme.eligibility
    : [scheme.eligibility];

  return (
    <motion.article
      layout="position"
      className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Category Indicator Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-green to-brand-accent-sunlight" />

      {/* Card Header badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-green/5 pb-3 mt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-black text-brand-green bg-brand-green-light border border-brand-green/10">
            <Award className="w-3.5 h-3.5" />
            {getCategoryLabel(scheme.category)}
          </span>

          {/* Government Type Tag */}
          {scheme.governmentType && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-brand-text bg-brand-beige border border-brand-brown/10">
              {scheme.governmentType === "central" ? t("cardLabels.govCentral") : t("cardLabels.govState")}
            </span>
          )}

          {/* State Tag */}
          {scheme.governmentType === "state" && scheme.state && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-brand-brown bg-brand-accent-soft">
              <MapPin className="w-3 h-3" />
              {getStateLabel(scheme.state)}
            </span>
          )}
        </div>

        {/* Status Badge */}
        {getStatusBadge(scheme.status)}
      </div>

      {/* Main Copy */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg md:text-xl font-black text-brand-green-deep tracking-tight leading-tight hover:text-brand-green transition-colors">
          <Link to={`/schemes/${scheme.slug}`} className="hover:underline">
            {scheme.title}
          </Link>
        </h3>
        <p className="text-xs text-brand-text-muted leading-relaxed font-semibold">
          {scheme.description}
        </p>
      </div>

      {/* Farmer Friendly Eligibility Tags */}
      {scheme.farmerTypes && (
        <div className="flex flex-wrap gap-1.5">
          {scheme.farmerTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-brand-green-light/40 text-brand-green-deep border border-brand-green/10"
            >
              {t(`farmerTypes.${type}`, { defaultValue: type })}
            </span>
          ))}
        </div>
      )}

      {/* Trust & Verification Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold border-t border-b border-brand-green/5 py-2 bg-emerald-50/30 px-3 rounded-xl">
        <span className="inline-flex items-center gap-1 text-emerald-700 font-extrabold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          {t("cardLabels.verifiedBy")}
        </span>
        {scheme.lastVerifiedDate && (
          <span className="text-brand-text-muted">
            {t("cardLabels.verifiedOn")}{" "}
            {(() => {
              try {
                const [year, month, day] = scheme.lastVerifiedDate.split("-");
                return `${day}/${month}/${year}`;
              } catch {
                return scheme.lastVerifiedDate;
              }
            })()}
          </span>
        )}
      </div>

      {/* Fast Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-brand-beige-cream/40 p-3.5 rounded-2xl border border-brand-green/5 text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-extrabold text-brand-text-muted uppercase tracking-wider">
            {t("cardLabels.benefitLabel")}
          </span>
          <span className="font-black text-brand-green-deep leading-snug">{scheme.benefits}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-extrabold text-brand-text-muted uppercase tracking-wider">
            {t("cardLabels.eligibilityLabel")}
          </span>
          <span className="font-bold text-brand-text leading-snug">{scheme.eligibilityPreview}</span>
        </div>
      </div>

      {/* Expand/Collapse and Navigation Footer */}
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-brand-green/5 gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-xs font-black text-brand-text hover:text-brand-green transition-colors"
          >
            {isExpanded ? t("cardLabels.closeBtn") : t("cardLabels.learnMoreBtn")}
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-brand-green" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-brand-green animate-bounce" />
            )}
          </button>

          <Link
            to={`/schemes/${scheme.slug}`}
            className="inline-flex items-center gap-1 text-xs font-black text-brand-green-deep hover:text-brand-green transition-all"
          >
            {t("cardLabels.fullPage")}
            <ArrowRight className="w-3 h-3 text-brand-green" />
          </Link>
        </div>

        {renderApplyButton()}
      </div>

      {/* Detailed Panel (Quick summary) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4 pt-3"
          >
            {/* Detailed Checklist */}
            <div className="flex flex-col gap-2.5 bg-brand-beige-cream/15 p-4 rounded-xl border border-brand-green/5">
              <h4 className="text-[10px] font-black text-brand-green-deep uppercase tracking-wider flex items-center gap-1.5">
                <ClipboardList className="w-3.5 h-3.5 text-brand-green" />
                {t("cardLabels.eligibilityLabel")}
              </h4>
              <ul className="flex flex-col gap-2">
                {eligibilityItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-brand-text font-bold leading-relaxed"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {scheme.supportType && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-brand-green/5">
                  <Layers className="w-4 h-4 text-brand-brown-warm flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-brand-text-muted">
                      {t("cardLabels.supportTypeLabel")}
                    </span>
                    <span className="font-black text-brand-green-deep">{scheme.supportType}</span>
                  </div>
                </div>
              )}

              {scheme.deadline && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-brand-green/5">
                  <Calendar className="w-4 h-4 text-brand-brown-warm flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-brand-text-muted">
                      {t("cardLabels.deadlineLabel")}
                    </span>
                    <span className="font-black text-brand-green-deep">{scheme.deadline}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Application Steps */}
            {scheme.process && (
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-brand-beige/20 border border-brand-green/5 text-xs">
                <span className="text-[10px] font-black text-brand-green-deep uppercase tracking-wider">
                  {t("cardLabels.processLabel")}
                </span>
                <p className="text-brand-text font-bold leading-relaxed">{scheme.process}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust & Compliance Messaging Box */}
      <div className="mt-1 p-3 rounded-2xl bg-brand-beige/10 border border-amber-500/10 flex gap-2.5 text-left">
        <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5 text-[10px] font-bold leading-normal text-brand-text-muted">
          <p className="text-brand-green-deep font-extrabold">
            {t("detailLabels.portalProcessNote")}
          </p>
          <p>
            {t("detailLabels.trustNoteDesc")}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default SchemeCard;
