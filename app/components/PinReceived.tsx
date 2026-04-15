"use client";

import { useTranslation } from "react-i18next";

export default function PinReceived({ pinMostrado, onClose }: any) {
  const { t } = useTranslation("common");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-8 text-center max-w-sm w-full mx-4">
        <div className="text-4xl mb-4">🔐</div>
        <h2 className="text-white text-xl font-bold mb-2">
          {t("reserved", { numero: pinMostrado.numero })}
        </h2>
        <p className="text-slate-400 mb-4">{t("yourPin")}</p>
        <div className="text-5xl font-bold text-green-400 tracking-widest mb-6">
          {pinMostrado.pin}
        </div>
        <p className="text-slate-500 text-sm mb-6">{t("savePin")}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          {t("gotIt")}
        </button>
      </div>
    </div>
  );
}
