"use client";

import { useTranslation } from "react-i18next";

export default function LoadingOverlay() {
  const { t } = useTranslation("common");
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4 animate-spin">⚙️</div>
        <p className="text-white font-medium">{t("sendingPin")}</p>
        <p className="text-slate-400 text-sm mt-2">{t("pleaseWait")}</p>
      </div>
    </div>
  );
}
