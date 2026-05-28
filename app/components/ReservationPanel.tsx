"use client";
import { useTranslation } from "react-i18next";

interface Props {
  usuario: string;
  email: string;
  privacyAccepted: boolean;
  filtro: string;
  onUsuario: (v: string) => void;
  onEmail: (v: string) => void;
  onPrivacy: (v: boolean) => void;
  onFiltro: (v: string) => void;
}

export default function ReservationPanel({
  usuario,
  email,
  privacyAccepted,
  filtro,
  onUsuario,
  onEmail,
  onPrivacy,
  onFiltro,
}: Props) {
  const { t } = useTranslation("common");

  const FILTERS = [
    { key: "all", label: t("all") },
    { key: "pequeño", label: t("small") },
    { key: "mediano", label: t("medium") },
    { key: "grande", label: t("large") },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,229,255,0.03)",
    border: "1px solid rgba(0,229,255,0.2)",
    color: "#c8dff5",
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "14px",
    padding: "10px 13px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "10px",
    letterSpacing: "2px",
    color: "#4a9aba",
    marginBottom: "7px",
  };

  return (
    <div
      style={{
        border: "1px solid rgba(0,229,255,0.15)",
        background: "rgba(2,12,24,0.7)",
        padding: "22px 24px",
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
        RESERVATION TERMINAL
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <div>
          <div style={labelStyle}>PASSENGER ID</div>
          <input
            type="text"
            placeholder={t("enterName")}
            value={usuario}
            onChange={(e) => onUsuario(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <div style={labelStyle}>CONTACT CHANNEL</div>
          <input
            type="email"
            placeholder={t("enterEmail")}
            value={email}
            onChange={(e) => onEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
          marginBottom: "16px",
        }}
      >
        <input
          type="checkbox"
          id="privacy"
          checked={privacyAccepted}
          onChange={(e) => onPrivacy(e.target.checked)}
          style={{
            width: "13px",
            height: "13px",
            cursor: "pointer",
            accentColor: "#00e5ff",
          }}
        />
        <label
          htmlFor="privacy"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "1px",
            color: "#4a9aba",
            cursor: "pointer",
          }}
        >
          {t("emailPrivacy").toUpperCase()}
        </label>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => onFiltro(f.key)}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "1.5px",
              padding: "7px 16px",
              border:
                filtro === f.key
                  ? "1px solid #00e5ff"
                  : "1px solid rgba(0,229,255,0.2)",
              background:
                filtro === f.key ? "rgba(0,229,255,0.07)" : "transparent",
              color: filtro === f.key ? "#00e5ff" : "#4a9aba",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
