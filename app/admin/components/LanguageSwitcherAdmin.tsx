"use client";
import { useTranslation } from "react-i18next";
import "../../../i18n";

const LANGS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {LANGS.map((l) => {
        const active = i18n.language === l.code;
        return (
          <button
            key={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              padding: "4px 6px",
              border: active
                ? "1px solid #00e5ff"
                : "1px solid rgba(0,229,255,0.25)",
              background: active ? "rgba(0,229,255,0.07)" : "transparent",
              color: active ? "#00e5ff" : "#5a7a90",
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {l.flag}
          </button>
        );
      })}
    </div>
  );
}
