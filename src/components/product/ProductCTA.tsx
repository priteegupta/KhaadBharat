import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MessageSquare, Handshake, FileDown } from "lucide-react";
import { getAssetUrl } from "../../utils/url";

interface ProductCTAProps {
  title: string;
  subtitle: string;
  btnConnect: string;
  btnPartner: string;
  btnDownload: string;
}

export const ProductCTA: React.FC<ProductCTAProps> = ({
  title,
  subtitle,
  btnConnect,
  btnPartner,
  btnDownload
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isHi = i18n.language === "hi";
  const [downloadUrl, setDownloadUrl] = useState("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
  const [downloadName, setDownloadName] = useState("Khaad_Bharat_Biochar_Photo_Guide.pdf");

  useEffect(() => {
    if (isHi) {
      const hindiUrl = "/downloads/खाद_भारत_बायोचार_जानकारी_पुस्तिका.pdf";
      fetch(getAssetUrl(hindiUrl), { method: "HEAD" })
        .then((res) => {
          if (res.ok) {
            setDownloadUrl(hindiUrl);
            setDownloadName("खाद_भारत_बायोचार_जानकारी_पुस्तिका.pdf");
          } else {
            setDownloadUrl("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
            setDownloadName("Khaad_Bharat_Biochar_Photo_Guide.pdf");
          }
        })
        .catch(() => {
          setDownloadUrl("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
          setDownloadName("Khaad_Bharat_Biochar_Photo_Guide.pdf");
        });
    } else {
      setDownloadUrl("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
      setDownloadName("Khaad_Bharat_Biochar_Photo_Guide.pdf");
    }
  }, [isHi]);

  return (
    <section className="py-16">
      <div className="relative overflow-hidden bg-brand-green-deep text-white rounded-3xl p-8 sm:p-16 text-center shadow-2xl border border-brand-green/20">
        
        {/* Animated background highlights */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-green-deep via-brand-green to-brand-green-deep opacity-95 -z-10" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-brown-warm/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-brand-green-light/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black mb-4 leading-tight"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-brand-green-light font-medium mb-10 max-w-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => navigate("/contact?interest=farmer")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-black text-brand-green-deep bg-white hover:bg-brand-green-light transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-brand-green" />
              <span>{btnConnect}</span>
            </button>

            <button
              onClick={() => navigate("/contact?interest=dealer")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-black text-white bg-brand-brown-warm hover:bg-brand-brown transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Handshake className="w-4 h-4" />
              <span>{btnPartner}</span>
            </button>

            <a
              href={getAssetUrl(downloadUrl)}
              download={downloadName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-black text-white bg-transparent hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{btnDownload}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductCTA;
