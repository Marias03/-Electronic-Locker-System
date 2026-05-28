"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Terminos() {
  const { t } = useTranslation("common");

  const sections = [
    { title: t("terms1Title"), content: t("terms1Content") },
    { title: t("terms2Title"), content: t("terms2Content") },
    { title: t("terms3Title"), content: t("terms3Content") },
    { title: t("terms4Title"), content: t("terms4Content") },
    { title: t("terms5Title"), content: t("terms5Content") },
    { title: t("terms6Title"), content: t("terms6Content") },
    { title: t("terms7Title"), content: t("terms7Content") },
    { title: t("terms8Title"), content: t("terms8Content") },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050b14",
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "'Rajdhani', sans-serif",
        color: "#c8dff5",
        padding: "40px 16px",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "24px",
          }}
        >
          <LanguageSwitcher />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#e8f4ff",
              marginBottom: "4px",
            }}
          >
            {t("termsTitle")}
          </h1>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#3a6a80",
            }}
          >
            {t("termsSubtitle")}
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#00e5ff",
                marginBottom: "8px",
              }}
            >
              {section.title}
            </div>
            <div
              style={{ fontSize: "14px", lineHeight: 1.7, color: "#8ab4cc" }}
            >
              {section.content}
            </div>
          </div>
        ))}

        <div
          style={{
            borderTop: "1px solid rgba(0,229,255,0.1)",
            paddingTop: "24px",
            marginTop: "8px",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "1px",
            color: "#3a6a80",
          }}
        >
          {t("termsUpdated")}
        </div>

        <button
          onClick={() => window.close()}
          style={{
            marginTop: "24px",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            letterSpacing: "2px",
            padding: "10px 24px",
            border: "1px solid rgba(0,229,255,0.2)",
            background: "transparent",
            color: "#4a9aba",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {t("termsBack")}
        </button>
      </div>
    </main>
  );
}
