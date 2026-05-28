"use client";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation("common");

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,229,255,0.12)",
        padding: "18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "38px",
            height: "38px",
            border: "1px solid #00e5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          🔒
        </div>
        <div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#e8f4ff",
            }}
          >
            Electronic Locker System
          </div>
          {t("brandSubtitle") && (
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                color: "#3a5a70",
                marginTop: "3px",
              }}
            >
              {t("brandSubtitle")}
            </div>
          )}
        </div>
      </div>
      <LanguageSwitcher />
    </div>
  );
}
