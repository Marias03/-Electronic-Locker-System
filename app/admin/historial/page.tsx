"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function maskEmail(email: string) {
  if (!email) return "-";
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user}...@${domain}`;
  return `${user[0]}${user[1]}...${user[user.length - 1]}@${domain}`;
}

const SIZE_LABEL: Record<string, string> = {
  pequeño: "SMALL",
  mediano: "MEDIUM",
  grande: "LARGE",
};

const SIZE_COLOR: Record<string, string> = {
  pequeño: "#00e5ff",
  mediano: "#f0a500",
  grande: "#a78bfa",
};

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const [filtro, setFiltro] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/historial")
      .then((r) => r.json())
      .then(setHistorial);
  }, []);

  const filtrados = historial.filter((h: any) =>
    filtro === "all" ? true : h.accion === filtro,
  );

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
      }}
    >
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
            📋
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
              Reservation History
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                color: "#3a5a70",
                marginTop: "3px",
              }}
            >
              Electronic Locker System
            </div>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin")}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            padding: "8px 16px",
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

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 40px" }}
      >
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
          {[
            { key: "all", label: "ALL" },
            { key: "reserved", label: "RESERVED" },
            { key: "released", label: "RELEASED" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
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
              }}
            >
              {f.label}
            </button>
          ))}
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#3a5a70",
              marginLeft: "auto",
              alignSelf: "center",
            }}
          >
            {filtrados.length} RECORDS
          </span>
        </div>

        <div
          style={{
            border: "1px solid rgba(0,229,255,0.12)",
            background: "rgba(2,12,24,0.7)",
            padding: "22px 24px",
            position: "relative",
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
            ACTIVITY LOG
          </span>

          {filtrados.length === 0 ? (
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#3a5a70",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              NO RECORDS FOUND
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["LOCKER", "SIZE", "ACTION", "USER", "EMAIL", "DATE"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "2px",
                          color: "#4a9aba",
                          textAlign: "left",
                          padding: "8px 12px",
                          borderBottom: "1px solid rgba(0,229,255,0.1)",
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((h: any) => (
                  <tr
                    key={h.id}
                    style={{ borderBottom: "1px solid rgba(0,229,255,0.05)" }}
                  >
                    <td
                      style={{
                        padding: "12px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "13px",
                        color: "#e8f4ff",
                      }}
                    >
                      #{String(h.numero).padStart(2, "0")}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "2px",
                          color: SIZE_COLOR[h.tamanio],
                          border: `1px solid ${SIZE_COLOR[h.tamanio]}40`,
                          padding: "3px 8px",
                        }}
                      >
                        {SIZE_LABEL[h.tamanio] || h.tamanio}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "2px",
                          color:
                            h.accion === "reserved" ? "#00e5ff" : "#ff4040",
                          border: `1px solid ${h.accion === "reserved" ? "rgba(0,229,255,0.2)" : "rgba(255,60,60,0.2)"}`,
                          padding: "3px 8px",
                        }}
                      >
                        {h.accion.toUpperCase()}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#c8dff5",
                        fontSize: "14px",
                      }}
                    >
                      {h.usuario || "-"}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "11px",
                        color: "#4a9aba",
                      }}
                    >
                      {maskEmail(h.email)}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "10px",
                        color: "#3a6a80",
                      }}
                    >
                      {new Date(h.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
