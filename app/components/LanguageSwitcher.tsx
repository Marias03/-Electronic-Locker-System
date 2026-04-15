"use client";

import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "🇬🇧 EN" },
  { code: "es", label: "🇪🇸 ES" },
  { code: "ru", label: "🇷🇺 RU" },
  { code: "ch", label: "🇨🇳 中文" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex justify-end gap-2 mb-6">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            i18n.language === lang.code
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
