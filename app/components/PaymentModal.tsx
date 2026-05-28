"use client";
import { useState } from "react";

interface Props {
  numero: number;
  tamanio: string;
  onSuccess: () => void;
  onClose: () => void;
}

const PRICES: Record<string, number> = {
  pequeño: 100,
  mediano: 150,
  grande: 200,
};

const SIZE_LABEL: Record<string, string> = {
  pequeño: "Small",
  mediano: "Medium",
  grande: "Large",
};

function formatCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 4)
    .replace(/(.{2})/, "$1/");
}

export default function PaymentModal({
  numero,
  tamanio,
  onSuccess,
  onClose,
}: Props) {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const price = PRICES[tamanio] || 100;

  function validate() {
    if (card.replace(/\s/g, "").length < 16) return "Enter a valid card number";
    if (expiry.length < 5) return "Enter a valid expiry date";
    if (cvv.length < 3) return "Enter a valid CVV";
    if (!name.trim()) return "Enter the cardholder name";
    return "";
  }

  async function handlePay() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 1500));
    onSuccess();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,229,255,0.03)",
    border: "1px solid rgba(0,229,255,0.2)",
    color: "#c8dff5",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "14px",
    padding: "10px 13px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "10px",
    letterSpacing: "2px",
    color: "#4a9aba",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#050b14",
          border: "1px solid rgba(0,229,255,0.2)",
          position: "relative",
          padding: "32px",
          margin: "0 16px",
        }}
      >
        {/* Corners */}
        {[
          {
            top: "8px",
            left: "8px",
            borderTop: "1px solid #00e5ff",
            borderLeft: "1px solid #00e5ff",
          },
          {
            top: "8px",
            right: "8px",
            borderTop: "1px solid #00e5ff",
            borderRight: "1px solid #00e5ff",
          },
          {
            bottom: "8px",
            left: "8px",
            borderBottom: "1px solid #00e5ff",
            borderLeft: "1px solid #00e5ff",
          },
          {
            bottom: "8px",
            right: "8px",
            borderBottom: "1px solid #00e5ff",
            borderRight: "1px solid #00e5ff",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "10px",
              height: "10px",
              ...s,
            }}
          />
        ))}

        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "14px",
                letterSpacing: "3px",
                color: "#00e5ff",
                marginBottom: "8px",
              }}
            >
              PAYMENT SUCCESSFUL
            </div>
            <div style={{ color: "#4a9aba", fontSize: "13px" }}>
              Sending PIN to your email...
            </div>
          </div>
        ) : processing ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "1px solid rgba(0,229,255,0.2)",
                borderTop: "1px solid #00e5ff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            />
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "12px",
                letterSpacing: "3px",
                color: "#00e5ff",
              }}
            >
              PROCESSING PAYMENT...
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#00e5ff",
                  marginBottom: "6px",
                }}
              >
                TINKOFF PAYMENT
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#e8f4ff",
                  marginBottom: "4px",
                }}
              >
                Locker #{String(numero).padStart(2, "0")} —{" "}
                {SIZE_LABEL[tamanio]}
              </div>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "22px",
                  color: "#00e5ff",
                  letterSpacing: "2px",
                }}
              >
                ₽{price}
              </div>
            </div>

            {/* Form */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>CARD NUMBER</label>
              <input
                style={inputStyle}
                placeholder="0000 0000 0000 0000"
                value={card}
                onChange={(e) => setCard(formatCard(e.target.value))}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <div>
                <label style={labelStyle}>EXPIRY</label>
                <input
                  style={inputStyle}
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                />
              </div>
              <div>
                <label style={labelStyle}>CVV</label>
                <input
                  style={inputStyle}
                  placeholder="000"
                  type="password"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>CARDHOLDER NAME</label>
              <input
                style={inputStyle}
                placeholder="IVAN PETROV"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>

            {error && (
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "1px",
                  color: "#ff4040",
                  marginBottom: "14px",
                }}
              >
                ⚠ {error.toUpperCase()}
              </div>
            )}

            <button
              onClick={handlePay}
              style={{
                width: "100%",
                padding: "12px",
                background: "rgba(0,229,255,0.08)",
                border: "1px solid #00e5ff",
                color: "#00e5ff",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                letterSpacing: "3px",
                cursor: "pointer",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              PAY ₽{price}
            </button>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                border: "1px solid rgba(0,229,255,0.15)",
                color: "#3a6a80",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              CANCEL
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
