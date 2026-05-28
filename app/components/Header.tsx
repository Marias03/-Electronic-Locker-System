"use client";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation("common");

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
            width: "32px",
            height: "32px",
            flexShrink: 0,
            border: "1px solid #00e5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
          }}
        >
          🔒
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#e8f4ff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Electronic Locker System
          </div>
          {t("brandSubtitle") && (
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                letterSpacing: "1px",
                color: "#3a5a70",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t("brandSubtitle")}
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
