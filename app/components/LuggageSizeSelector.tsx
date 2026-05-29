"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onSelect: (size: string) => void;
  selected: string | null;
  disponibles: { pequeño: number; mediano: number; grande: number };
}

export default function LuggageSizeSelector({
  onSelect,
  selected,
  disponibles,
}: Props) {
  const { t } = useTranslation("common");
  const [hovered, setHovered] = useState<string | null>(null);

  const SIZES = [
    {
      key: "pequeño",
      label: t("handBag"),
      icon: "💼",
      dims: "max 55×40×20 cm",
      count: disponibles.pequeño,
    },
    {
      key: "mediano",
      label: t("mediumBag"),
      icon: "🧳",
      dims: "max 70×50×30 cm",
      count: disponibles.mediano,
    },
    {
      key: "grande",
      label: t("largeBag"),
      icon: "🛄",
      dims: "max 90×70×40 cm",
      count: disponibles.grande,
    },
  ];

  return (
    <div
      style={{
        border: "1px solid rgba(0,229,255,0.15)",
        background: "rgba(2,12,24,0.7)",
        padding: "22px 16px",
        position: "relative",
        marginBottom: "20px",
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
        {t("bagSize").toUpperCase()}
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {SIZES.map((s) => {
          const isSelected = selected === s.key;
          const isHovered = hovered === s.key;
          const noAvailable = s.count === 0;

          return (
            <button
              key={s.key}
              onClick={() => !noAvailable && onSelect(s.key)}
              onMouseEnter={() => setHovered(s.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "16px 8px",
                border: isSelected
                  ? "1px solid #00e5ff"
                  : isHovered && !noAvailable
                    ? "1px solid rgba(0,229,255,0.5)"
                    : "1px solid rgba(0,229,255,0.15)",
                background: isSelected
                  ? "rgba(0,229,255,0.08)"
                  : isHovered && !noAvailable
                    ? "rgba(0,229,255,0.04)"
                    : "transparent",
                color: noAvailable
                  ? "#2a4a5a"
                  : isSelected
                    ? "#00e5ff"
                    : "#4a9aba",
                cursor: noAvailable ? "not-allowed" : "pointer",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.15s",
                opacity: noAvailable ? 0.5 : 1,
                position: "relative",
              }}
            >
              <span style={{ fontSize: "28px" }}>{s.icon}</span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  lineHeight: 1.3,
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "9px",
                  color: isSelected ? "rgba(0,229,255,0.6)" : "#3a5a70",
                  letterSpacing: "0.5px",
                }}
              >
                {s.dims}
              </span>

              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#00e5ff",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
