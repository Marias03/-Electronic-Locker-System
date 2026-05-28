"use client";

interface Props {
  password: string;
  error: string;
  onChange: (v: string) => void;
  onLogin: () => void;
}

export default function AdminLogin({
  password,
  error,
  onChange,
  onLogin,
}: Props) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050b14",
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(0,229,255,0.15)",
          background: "rgba(2,12,24,0.9)",
          padding: "40px",
          width: "100%",
          maxWidth: "360px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            width: "10px",
            height: "10px",
            borderTop: "1px solid rgba(0,229,255,0.4)",
            borderLeft: "1px solid rgba(0,229,255,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "10px",
            height: "10px",
            borderTop: "1px solid rgba(0,229,255,0.4)",
            borderRight: "1px solid rgba(0,229,255,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            width: "10px",
            height: "10px",
            borderBottom: "1px solid rgba(0,229,255,0.4)",
            borderLeft: "1px solid rgba(0,229,255,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            width: "10px",
            height: "10px",
            borderBottom: "1px solid rgba(0,229,255,0.4)",
            borderRight: "1px solid rgba(0,229,255,0.4)",
          }}
        />

        <div
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid #00e5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            margin: "0 auto 20px",
          }}
        >
          🔐
        </div>

        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "14px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#e8f4ff",
            marginBottom: "6px",
          }}
        >
          Admin Access
        </div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#3a6a80",
            marginBottom: "28px",
          }}
        >
          RESTRICTED TERMINAL
        </div>

        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            color: "#4a9aba",
            marginBottom: "8px",
            textAlign: "left",
          }}
        >
          ACCESS CODE
        </div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onLogin()}
          style={{
            width: "100%",
            background: "rgba(0,229,255,0.03)",
            border: "1px solid rgba(0,229,255,0.2)",
            color: "#c8dff5",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "14px",
            padding: "10px 13px",
            outline: "none",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "1px",
              color: "#ff4040",
              marginBottom: "12px",
            }}
          >
            ⚠ {error.toUpperCase()}
          </div>
        )}

        <button
          onClick={onLogin}
          style={{
            width: "100%",
            padding: "11px",
            background: "rgba(0,229,255,0.08)",
            border: "1px solid #00e5ff",
            color: "#00e5ff",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            letterSpacing: "3px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.15s",
          }}
        >
          AUTHENTICATE
        </button>
      </div>
    </main>
  );
}
