import React from "react";
import { useTranslation } from "react-i18next";
import { FileText, Download, FileType2 } from "lucide-react";

interface DocumentData {
  id: string;
  title: string;
  desc: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
}

interface DownloadCardProps {
  document: DocumentData;
}

export const DownloadCard: React.FC<DownloadCardProps> = ({ document }) => {
  const { t } = useTranslation();

  return (
    <article className="group rounded-3xl bg-white border border-brand-green/10 p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        {/* Header Icon & Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-green-light text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-brown-warm/15 text-brand-brown text-xs font-black">
              <FileType2 className="w-3.5 h-3.5" />
              {document.fileType}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-brand-green/10 text-brand-green-deep text-xs font-black">
              {document.fileSize}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <h3 className="text-lg font-black text-brand-green-deep mb-2 group-hover:text-brand-green transition-colors">
            {document.title}
          </h3>
          <p className="text-sm text-brand-text-muted leading-relaxed font-semibold">
            {document.desc}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6 pt-4 border-t border-brand-green/5">
        <a
          href={document.fileUrl}
          download
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-extrabold text-brand-green bg-brand-green-light hover:bg-brand-green hover:text-white transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          {t("media.brochures.download")}
        </a>
      </div>
    </article>
  );
};

export default DownloadCard;
