"use client";

import { useTranslation } from "react-i18next";

export default function Stats({ total, disponibles, ocupados }: any) {
  const { t } = useTranslation("common");
  const percentage = total > 0 ? Math.round((ocupados / total) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-5 text-center border border-slate-700/50 hover:border-slate-500 transition-all duration-300">
          <div className="text-3xl font-bold text-white">{total}</div>
          <div className="text-slate-400 text-sm mt-1 uppercase tracking-wider">
            {t("total")}
          </div>
        </div>
        <div className="bg-green-900/30 backdrop-blur rounded-2xl p-5 text-center border border-green-500/40 hover:border-green-400 transition-all duration-300">
          <div className="text-3xl font-bold text-green-400">{disponibles}</div>
          <div className="text-green-500/70 text-sm mt-1 uppercase tracking-wider">
            {t("available")}
          </div>
        </div>
        <div className="bg-red-900/30 backdrop-blur rounded-2xl p-5 text-center border border-red-500/40 hover:border-red-400 transition-all duration-300">
          <div className="text-3xl font-bold text-red-400">{ocupados}</div>
          <div className="text-red-500/70 text-sm mt-1 uppercase tracking-wider">
            {t("occupied")}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>{t("occupancy")}</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
