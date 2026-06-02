"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import LanguageSwitcher from "./LanguageSwitcher";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

interface Props {
  onClose: () => void;
}

export default function SucursalSelector({ onClose }: Props) {
  const [sucursales, setSucursales] = useState([]);
  const [selected, setSelected] = useState<any>(null);
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    fetch("/api/sucursales")
      .then((r) => r.json())
      .then(setSucursales);
  }, []);

  function getNombre(sucursal: any) {
    const lang = i18n.language;
    if (lang === "es" && sucursal.nombre_es) return sucursal.nombre_es;
    if (lang === "ru" && sucursal.nombre_ru) return sucursal.nombre_ru;
    if (lang === "ch" && sucursal.nombre_ch) return sucursal.nombre_ch;
    return sucursal.nombre_en || sucursal.nombre;
  }

  function handleSelect(sucursal: any) {
    setSelected(sucursal);
  }

  function handleGo() {
    if (!selected) return;
    onClose();
    router.push(`/sucursal/${selected.slug}`);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "#050b14",
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "'Rajdhani', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        gap: "20px",
      }}
    >
      {/* Language switcher */}
      <div style={{ position: "absolute", top: "16px", right: "16px" }}>
        <LanguageSwitcher />
      </div>

      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#00e5ff",
            marginBottom: "6px",
          }}
        >
          {t("selectLocation").toUpperCase()}
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#e8f4ff",
          }}
        >
          Electronic Locker System
        </div>
      </div>

      {/* Lista de sucursales */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {sucursales.map((s: any) => (
          <div
            key={s.id}
            onClick={() => handleSelect(s)}
            style={{
              border:
                selected?.id === s.id
                  ? "1px solid #00e5ff"
                  : "1px solid rgba(0,229,255,0.15)",
              background:
                selected?.id === s.id
                  ? "rgba(0,229,255,0.05)"
                  : "rgba(0,10,20,0.6)",
              padding: "14px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>📍</span>
              <div>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "13px",
                    color: selected?.id === s.id ? "#00e5ff" : "#c8dff5",
                  }}
                >
                  {getNombre(s)}
                </div>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "9px",
                    color: "#3a6a80",
                    marginTop: "2px",
                  }}
                >
                  {s.ciudad}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: selected?.id === s.id ? "#00e5ff" : "#1a3a50",
              }}
            />
          </div>
        ))}
      </div>

      {/* Selected info */}
      <div style={{ minHeight: "40px", textAlign: "center" }}>
        {selected ? (
          <div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#00e5ff",
              }}
            >
              📍 {getNombre(selected)}
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                letterSpacing: "1px",
                color: "#3a6a80",
                marginTop: "4px",
              }}
            >
              {selected.ciudad} — {t(selected.tipo)}
            </div>
          </div>
        ) : (
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#2a4a60",
            }}
          >
            {t("selectLocation").toUpperCase()}
          </div>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleGo}
        disabled={!selected}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          letterSpacing: "3px",
          padding: "12px 40px",
          border: selected
            ? "1px solid #00e5ff"
            : "1px solid rgba(0,229,255,0.2)",
          background: selected ? "rgba(0,229,255,0.08)" : "transparent",
          color: selected ? "#00e5ff" : "#2a4a60",
          cursor: selected ? "pointer" : "not-allowed",
          textTransform: "uppercase",
          transition: "all 0.2s",
        }}
      >
        {t("accessTerminal").toUpperCase()} →
      </button>
    </div>
  );
}
