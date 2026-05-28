"use client";
import { useTranslation } from "react-i18next";
import "../../../i18n";

interface Props {
  total: number;
  ocupados: number;
  disponibles: number;
}

export default function AdminStats({ total, ocupados, disponibles }: Props) {
  const { t } = useTranslation("common");

  const items = [
    {
      label: t("totalUnits").toUpperCase(),
      value: total,
      color: "#7a9ab0",
      bar: "#334a5a",
    },
    {
      label: t("occupied").toUpperCase(),
      value: String(ocupados).padStart(2, "0"),
      color: "#ff4040",
      bar: "#ff4040",
    },
    {
      label: t("available").toUpperCase(),
      value: String(disponibles).padStart(2, "0"),
      color: "#00e5ff",
      bar: "#00e5ff",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        border: "1px solid rgba(0,229,255,0.1)",
        marginBottom: "24px",
      }}
    >
      {items.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "16px 22px",
            position: "relative",
            borderRight: i < 2 ? "1px solid rgba(0,229,255,0.1)" : "none",
            background: "#050b14",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: s.bar,
            }}
          />
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#4a9aba",
              marginBottom: "6px",
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              fontSize: "34px",
              fontWeight: 600,
              color: s.color,
              lineHeight: 1,
            }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
