"use client";
import { useTranslation } from "react-i18next";

export default function Stats({ total, disponibles, ocupados }: any) {
  const { t } = useTranslation("common");
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-slate-800 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white">{total}</div>
        <div className="text-slate-400 text-sm">{t("total")}</div>
      </div>
      <div className="bg-green-900 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400">{disponibles}</div>
        <div className="text-slate-400 text-sm">{t("available")}</div>
      </div>
      <div className="bg-red-900 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-red-400">{ocupados}</div>
        <div className="text-slate-400 text-sm">{t("occupied")}</div>
      </div>
    </div>
  );
}
