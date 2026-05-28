"use client";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t, i18n } = useTranslation("common");
  const subtitle = t("brandSubtitle");

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,229,255,0.12)",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minWidth: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            flexShrink: 0,
            border: "1px solid #00e5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
          }}
        >
          🔒
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#e8f4ff",
            }}
          >
            Electronic Locker System
          </div>
          {subtitle && subtitle !== "Electronic Locker System" && (
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                letterSpacing: "1px",
                color: "#3a5a70",
                marginTop: "2px",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
