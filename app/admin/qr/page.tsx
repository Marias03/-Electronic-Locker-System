"use client";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";

const APP_URL = "https://electronic-locker-system-k1l8.vercel.app";

export default function QRPage() {
  const router = useRouter();

  function handlePrint() {
    window.print();
  }

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#00e5ff",
            marginBottom: "8px",
          }}
        >
          TERMINAL ACCESS
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#e8f4ff",
            marginBottom: "4px",
          }}
        >
          Electronic Locker System
        </div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#3a6a80",
          }}
        >
          KAZAN INTERNATIONAL AIRPORT — SCAN TO RESERVE
        </div>
      </div>

      {/* QR */}
      <div
        style={{
          border: "1px solid rgba(0,229,255,0.2)",
          padding: "24px",
          background: "white",
          position: "relative",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "6px",
            width: "12px",
            height: "12px",
            borderTop: "2px solid #00e5ff",
            borderLeft: "2px solid #00e5ff",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            width: "12px",
            height: "12px",
            borderTop: "2px solid #00e5ff",
            borderRight: "2px solid #00e5ff",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            left: "6px",
            width: "12px",
            height: "12px",
            borderBottom: "2px solid #00e5ff",
            borderLeft: "2px solid #00e5ff",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            width: "12px",
            height: "12px",
            borderBottom: "2px solid #00e5ff",
            borderRight: "2px solid #00e5ff",
          }}
        />
        <QRCodeSVG
          value={APP_URL}
          size={240}
          bgColor="#ffffff"
          fgColor="#050b14"
          level="H"
        />
      </div>

      {/* URL */}
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          letterSpacing: "1px",
          color: "#4a9aba",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        {APP_URL}
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        className="no-print"
      >
        <button
          onClick={handlePrint}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            letterSpacing: "2px",
            padding: "10px 24px",
            border: "1px solid #00e5ff",
            background: "rgba(0,229,255,0.08)",
            color: "#00e5ff",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          🖨️ PRINT / SAVE PDF
        </button>
        <button
          onClick={() => router.push("/admin")}
          style={{
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
          ← BACK TO ADMIN
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          main {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </main>
  );
}
