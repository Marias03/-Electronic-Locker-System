"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import LanguageSwitcherAdmin from "./LanguageSwitcherAdmin";

export default function AdminHeader() {
  const router = useRouter();
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
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minWidth: 0,
          flex: 1,
          overflow: "hidden",
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
            fontSize: "14px",
          }}
        >
          🛠️
        </div>
        <div style={{ minWidth: 0, overflow: "hidden" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#e8f4ff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t("adminPanel")}
          </div>
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
            Electronic Locker System
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "4px",
          flexShrink: 0,
          alignItems: "center",
        }}
      >
        <LanguageSwitcherAdmin />
        <button
          onClick={() => router.push("/admin/historial")}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "1px",
            padding: "6px 8px",
            border: "1px solid rgba(0,229,255,0.2)",
            background: "transparent",
            color: "#4a9aba",
            cursor: "pointer",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {t("history")}
        </button>
        <button
          onClick={() => router.push("/admin/qr")}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "1px",
            padding: "6px 8px",
            border: "1px solid rgba(0,229,255,0.2)",
            background: "transparent",
            color: "#4a9aba",
            cursor: "pointer",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          QR
        </button>
        <button
          onClick={() => router.push("/")}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "1px",
            padding: "6px 8px",
            border: "1px solid rgba(0,229,255,0.2)",
            background: "transparent",
            color: "#4a9aba",
            cursor: "pointer",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {t("backToApp")}
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/admin" })}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "1px",
            padding: "6px 8px",
            border: "1px solid rgba(255,60,60,0.3)",
            background: "transparent",
            color: "#ff4040",
            cursor: "pointer",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
}
