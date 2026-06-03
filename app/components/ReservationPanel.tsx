"use client";
import { useTranslation } from "react-i18next";

interface Props {
  usuario: string;
  email: string;
  privacyAccepted: boolean;
  filtro: string;
  reservaFutura: string;
  onUsuario: (v: string) => void;
  onEmail: (v: string) => void;
  onPrivacy: (v: boolean) => void;
  onFiltro: (v: string) => void;
  onReservaFutura: (v: string) => void;
}

export default function ReservationPanel({
  usuario,
  email,
  privacyAccepted,
  filtro,
  reservaFutura,
  onUsuario,
  onEmail,
  onPrivacy,
  onFiltro,
  onReservaFutura,
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
    boxSizing: "border-box",
    WebkitAppearance: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "10px",
    letterSpacing: "2px",
    color: "#4a9aba",
    marginBottom: "7px",
    display: "block",
  };

  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16);
  const maxDateTime = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  return (
    <>
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #050b14 inset !important;
          -webkit-text-fill-color: #c8dff5 !important;
          border: 1px solid rgba(0,229,255,0.2) !important;
        }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(175deg);
          cursor: pointer;
        }
      `}</style>

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
          {t("reservationTerminal").toUpperCase()}
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          <div>
            <label style={labelStyle}>{t("passengerId").toUpperCase()}</label>
            <input
              type="text"
              placeholder={t("enterName")}
              value={usuario}
              onChange={(e) => onUsuario(e.target.value)}
              autoComplete="off"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>
              {t("contactChannel").toUpperCase()}
            </label>
            <input
              type="email"
              placeholder={t("enterEmail")}
              value={email}
              onChange={(e) => onEmail(e.target.value)}
              autoComplete="off"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>
              {t("advanceBooking").toUpperCase()}
            </label>
            <input
              type="datetime-local"
              min={minDateTime}
              max={maxDateTime}
              value={reservaFutura}
              onChange={(e) => {
                const selected = new Date(e.target.value);
                const max = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                if (selected <= max) {
                  onReservaFutura(e.target.value);
                } else {
                  onReservaFutura(maxDateTime);
                }
              }}
              style={{
                ...inputStyle,
                colorScheme: "dark",
              }}
            />
            {reservaFutura &&
              (new Date(reservaFutura) >
              new Date(now.getTime() + 24 * 60 * 60 * 1000) ? (
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "9px",
                    color: "#ff4040",
                    marginTop: "6px",
                    letterSpacing: "1px",
                  }}
                >
                  ✗ {t("maxAdvanceBooking").toUpperCase()}
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "9px",
                    color: "#00e5ff",
                    marginTop: "6px",
                    letterSpacing: "1px",
                  }}
                >
                  ✓ SCHEDULED FOR{" "}
                  {new Date(reservaFutura).toLocaleString([], {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
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
              flexShrink: 0,
              marginTop: "2px",
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
              lineHeight: 1.4,
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
                padding: "7px 14px",
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
    </>
  );
}
