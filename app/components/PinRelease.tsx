"use client";

import { useTranslation } from "react-i18next";

export default function PinRelease({
  pinModal,
  pinInput,
  setPinInput,
  error,
  onRelease,
  onClose,
}: any) {
  const { t } = useTranslation("common");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-8 text-center max-w-sm w-full mx-4">
        <div className="text-4xl mb-4">🔑</div>
        <h2 className="text-white text-xl font-bold mb-2">
          {t("releaseLocker", { numero: pinModal.numero })}
        </h2>
        <p className="text-slate-400 mb-4">{t("enterPin")}</p>
        <input
          type="text"
          maxLength={4}
          placeholder="0000"
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          className="bg-slate-700 text-white text-center text-2xl tracking-widest border border-slate-600 rounded-xl px-4 py-3 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="bg-slate-600 hover:bg-slate-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onRelease}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            {t("release")}
          </button>
        </div>
      </div>
    </div>
  );
}
