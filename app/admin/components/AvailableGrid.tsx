"use client";
import { useTranslation } from "react-i18next";
import "../../../i18n";

const SIZE_LABEL: Record<string, string> = {
  pequeño: "SMALL",
  mediano: "MEDIUM",
  grande: "LARGE",
};
const SIZE_COLOR: Record<string, string> = {
  pequeño: "#00e5ff",
  mediano: "#f0a500",
  grande: "#a78bfa",
};

interface Props {
  disponibles: any[];
}

export default function AvailableGrid({ disponibles }: Props) {
  const { t } = useTranslation("common");

  return (
    <div
      style={{
        border: "1px solid rgba(0,229,255,0.12)",
        background: "rgba(2,12,24,0.7)",
        padding: "22px 16px",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: "16px",
          transform: "translateY(-50%)",
          background: "#050b14",
          padding: "0 8px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px",
          letterSpacing: "2px",
          color: "#00e5ff",
        }}
      >
        {t("availableUnits").toUpperCase()}
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
        }}
      >
        {disponibles.map((c: any) => (
          <div
            key={c.id}
            style={{
              border: "1px solid rgba(0,229,255,0.12)",
              background: "rgba(0,10,20,0.9)",
              padding: "10px 6px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "rgba(0,229,255,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#00e5ff",
                animation: "blink 2s infinite",
              }}
            />
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "12px",
                color: "#c8dff5",
                marginBottom: "3px",
                letterSpacing: "1px",
              }}
            >
              #{String(c.numero).padStart(2, "0")}
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "8px",
                letterSpacing: "1px",
                color: SIZE_COLOR[c.tamanio],
              }}
            >
              {SIZE_LABEL[c.tamanio] || c.tamanio}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
