import React from "react";
import { useTranslation } from "react-i18next";
import { Download, Image, Layers } from "lucide-react";
import { getAssetUrl } from "../../utils/url";

interface ResourceData {
  id: string;
  title: string;
  category: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
}

interface ResourceCardProps {
  resource: ResourceData;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { t } = useTranslation();

  return (
    <article className="group rounded-3xl bg-white border border-brand-green/10 p-4 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        {/* Resource Asset Preview Thumbnail */}
        <div className="relative aspect-video w-full bg-brand-green-light rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-brand-green/5">
          {/* Real image preview of vectors/pngs */}
          <img
            src={getAssetUrl(resource.fileUrl)}
            alt={resource.title}
            loading="lazy"
            decoding="async"
            className="max-h-[85%] max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // fallback if it fails or isn't a direct renderable image
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement?.querySelector(".fallback-icon")?.classList.remove("hidden");
            }}
          />
          <div className="fallback-icon hidden text-brand-green-deep">
            <Image className="w-10 h-10" />
          </div>
        </div>

        {/* Metadata Details */}
        <div className="px-1">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green-deep text-[10px] font-black uppercase">
              <Layers className="w-3 h-3" />
              {resource.category}
            </span>
            <span className="px-2 py-0.5 rounded bg-brand-text/5 text-brand-text-muted text-[10px] font-black uppercase">
              {resource.fileType} • {resource.fileSize}
            </span>
          </div>
          <h3 className="text-base font-extrabold text-brand-green-deep line-clamp-1 group-hover:text-brand-green transition-colors">
            {resource.title}
          </h3>
        </div>
      </div>

      {/* Action */}
      <div className="mt-4 pt-3 border-t border-brand-green/5">
        <a
          href={getAssetUrl(resource.fileUrl)}
          download={resource.fileUrl.split("/").pop()}
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-brand-green bg-brand-green-light hover:bg-brand-green hover:text-white transition-all duration-300"
        >
          <Download className="w-3.5 h-3.5" />
          {t("media.resources.download")}
        </a>
      </div>
    </article>
  );
};

export default ResourceCard;
