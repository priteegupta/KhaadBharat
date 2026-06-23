"use client"; // Required for Next.js App Router

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./KhaadChat.module.css";


// ─── CONFIG ──────────────────────────────────────────────────
// During development:  http://localhost:3000
// After deployment:    https://your-app.onrender.com
const API_BASE =
  import.meta.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:3000";
// ─────────────────────────────────────────────────────────────

const LANG_CONFIG = {
  en: {
    platform: "khaad_en",
    title: "Khaad Bharat Assistant",
    subtitle: "Online · Replies instantly",
    placeholder: "Ask about fertilizers, crops…",
    welcome:
      "🌱 Welcome to Khaad Bharat!\n\nI can help you with fertilizers, crop advice, and biochar. How can I assist you today?",
    chips: [
      "🌾 Wheat fertilizer",
      "🌽 Maize crops",
      "🏛️ 📜  About Government schemes",
      "🌱 ♻️ About Biochar",
    ],
    chipMessages: [
      "Which fertilizer is best for wheat?",
      "Fertilizer recommendation for maize crop",
      "About Government schemes?",
      "What is Biochar and how can it help my farm?",
    ],
    errorMsg: "Connection error. Please try again.",
  },
  hi: {
    platform: "khaad_hi",
    title: "खाद भारत सहायक",
    subtitle: "ऑनलाइन · तुरंत जवाब",
    placeholder: "उर्वरक, फसल के बारे में पूछें…",
    welcome:
      "🌱 खाद भारत में आपका स्वागत है!\n\nमैं आपको फर्टिलाइज़र (उर्वरक), फसल सलाह और बायोचार के इस्तेमाल से जुड़ी जानकारी देकर आपकी मदद कर सकता हूँ। आज आप क्या जानना चाहते हैं?",
    chips: [
      "🌾 गेहूं उर्वरक",
      "🌽 मक्का फसल",
      "🏛️ 📜  सरकारी योजनाएं",
      "🌱 ♻️ बायोचार के बारे में",
    ],
    chipMessages: [
      "गेहूं के लिए कौन सा उर्वरक सबसे अच्छा है?",
      "मक्का की फसल के लिए उर्वरक बताएं",
      "सरकारी योजनाएं क्या हैं?",
      "बायोचार क्या है और इससे मेरे खेत को कैसे मदद मिलेगी?",
    ],
    errorMsg: "कनेक्शन त्रुटि। कृपया पुनः प्रयास करें।",
  },
};

export default function KhaadChat() {
  const { i18n, t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(i18n.language === "hi" ? "hi" : "en");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const cfg = LANG_CONFIG[lang];

  // Sync lang state with global i18n.language changes
  useEffect(() => {
    const currentLang = i18n.language === "hi" ? "hi" : "en";
    if (currentLang !== lang) {
      setLang(currentLang);
      setMessages([
        {
          role: "assistant",
          content: LANG_CONFIG[currentLang].welcome,
          id: Date.now(),
        },
      ]);
    }
  }, [i18n.language]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Send welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: "assistant", content: cfg.welcome, id: Date.now() },
      ]);
    }
  }, [isOpen]);

  // Reset chat when language changes
  const handleLangSwitch = (newLang) => {
    if (newLang === lang) return;
    setLang(newLang);
    i18n.changeLanguage(newLang);
    setMessages([
      {
        role: "assistant",
        content: LANG_CONFIG[newLang].welcome,
        id: Date.now(),
      },
    ]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setHasNotif(false);
  };

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || isTyping) return;
    setInput("");

    const userMsg = { role: "user", content: userText, id: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
          platform: cfg.platform,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "error",
            content: data.error || cfg.errorMsg,
            id: Date.now(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            id: Date.now(),
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content: cfg.errorMsg,
          id: Date.now(),
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.widget}>
      {/* ── Chat Window ── */}
      <div className={`${styles.window} ${isOpen ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatar}>🌾</div>
          <div className={styles.headerInfo}>
            <div className={styles.headerName}>{cfg.title}</div>
            <div className={styles.headerStatus}>
              <span className={styles.statusDot} />
              {cfg.subtitle}
            </div>
          </div>
          <div className={styles.langToggle}>
            <button
              className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`}
              onClick={() => handleLangSwitch("en")}
            >
              {lang === "hi" ? "अंग्रेजी" : "EN"}
            </button>
            <button
              className={`${styles.langBtn} ${lang === "hi" ? styles.langActive : ""}`}
              onClick={() => handleLangSwitch("hi")}
            >
              {lang === "hi" ? "हिन्दी" : "HI"}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.msg} ${styles[msg.role]}`}>
              {msg.content}
            </div>
          ))}
          {isTyping && (
            <div className={styles.typing}>
              <span />
              <span />
              <span />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Chips */}
        <div className={styles.chips}>
          {cfg.chips.map((chip, i) => (
            <button
              key={i}
              className={styles.chip}
              onClick={() => sendMessage(cfg.chipMessages[i])}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className={styles.inputBar}>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={cfg.placeholder}
            autoComplete="off"
          />
          <button
            className={styles.sendBtn}
            onClick={() => sendMessage()}
            disabled={isTyping}
          >
            <svg viewBox="0 0 24 24" fill="white" width="17" height="17">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>

        <div className={styles.footer}>{t("ui.chatbot.poweredBy")}</div>
      </div>

      {/* ── Bubble Button ── */}
      <button
        className={`${styles.bubble} ${isOpen ? styles.bubbleOpen : ""}`}
        onClick={toggleChat}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
        {hasNotif && !isOpen && <span className={styles.notif}>1</span>}
      </button>
    </div>
  );
}
