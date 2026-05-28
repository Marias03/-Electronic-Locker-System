"use client";
import { useTranslation } from "react-i18next";

interface Casillero {
  id: number;
  numero: number;
  tamanio: string;
  ocupado: boolean;
}

interface Props {
  casillero: Casillero;
  onReservar: (id: number, numero: number) => void;
  onLiberar: (id: number, numero: number) => void;
}

const ICONS: Record<string, string> = {
  pequeño: "📦",
  mediano: "💼",
  grande: "🧳",
};

const SIZE_LABEL: Record<string, string> = {
  pequeño: "SMALL",
  mediano: "MEDIUM",
  grande: "LARGE",
};

export default function LockerCard({
  casillero,
  onReservar,
  onLiberar,
}: Props) {
  const { t } = useTranslation("common");
  const { id, numero, tamanio, ocupado } = casillero;

  return (
    <div
      style={{
        border: `1px solid ${ocupado ? "rgba(255,60,60,0.25)" : "rgba(0,229,255,0.15)"}`,
        background: ocupado ? "rgba(25,0,0,0.8)" : "rgba(0,10,20,0.9)",
        padding: "14px 8px 11px",
        textAlign: "center",
        position: "relative",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: ocupado ? "rgba(255,60,60,0.35)" : "rgba(0,229,255,0.25)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "7px",
          left: "7px",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: ocupado ? "#ff4040" : "#00e5ff",
          animation: ocupado ? "none" : "blink 2s infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          width: "7px",
          height: "7px",
          borderTop: `1px solid ${ocupado ? "rgba(255,60,60,0.4)" : "rgba(0,229,255,0.4)"}`,
          borderRight: `1px solid ${ocupado ? "rgba(255,60,60,0.4)" : "rgba(0,229,255,0.4)"}`,
        }}
      />

      <div style={{ fontSize: "20px", marginBottom: "7px" }}>
        {ICONS[tamanio] || "🔒"}
      </div>
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "14px",
          color: "#c8dff5",
          marginBottom: "4px",
          letterSpacing: "1px",
        }}
      >
        #{String(numero).padStart(2, "0")}
      </div>
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "9px",
          letterSpacing: "2px",
          color: ocupado ? "#6a2a2a" : "#3a6a80",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        {SIZE_LABEL[tamanio] || tamanio}
      </div>

      {ocupado ? (
        <button
          onClick={() => onLiberar(id, numero)}
          style={{
            width: "100%",
            padding: "6px 4px",
            background: "rgba(255,60,60,0.05)",
            border: "1px solid rgba(255,60,60,0.2)",
            color: "#ff4040",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "2px",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {t("release")}
        </button>
      ) : (
        <button
          onClick={() => onReservar(id, numero)}
          style={{
            width: "100%",
            padding: "6px 4px",
            background: "rgba(0,229,255,0.07)",
            border: "1px solid rgba(0,229,255,0.25)",
            color: "#00e5ff",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "2px",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {t("reserve")}
        </button>
      )}
    </div>
  );
}
