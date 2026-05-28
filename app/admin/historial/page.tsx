"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const [historial, setHistorial] = useState([]);
  const [filtro, setFiltro] = useState("all");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin");
    if (session) {
      fetch("/api/historial")
        .then((r) => r.json())
        .then(setHistorial);
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#050b14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "12px",
            letterSpacing: "3px",
            color: "#00e5ff",
          }}
        >
          LOADING...
        </div>
      </main>
    );
  }

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
      {/* HEADER */}
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
            📋
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
              Reservation History
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
        <button
          onClick={() => router.push("/admin")}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "1px",
            padding: "6px 8px",
            flexShrink: 0,
            border: "1px solid rgba(0,229,255,0.2)",
            background: "transparent",
            color: "#4a9aba",
            cursor: "pointer",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ← ADMIN
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-10 py-6">
        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "20px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
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
                padding: "7px 14px",
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
            }}
          >
            {filtrados.length} RECORDS
          </span>
        </div>

        {/* TABLE */}
        <div
          style={{
            border: "1px solid rgba(0,229,255,0.12)",
            background: "rgba(2,12,24,0.7)",
            padding: "22px 16px",
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
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "480px",
                }}
              >
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
                            padding: "8px 10px",
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
                          padding: "10px",
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "12px",
                          color: "#e8f4ff",
                        }}
                      >
                        #{String(h.numero).padStart(2, "0")}
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span
                          style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "8px",
                            letterSpacing: "1px",
                            color: SIZE_COLOR[h.tamanio],
                            border: `1px solid ${SIZE_COLOR[h.tamanio]}40`,
                            padding: "2px 6px",
                          }}
                        >
                          {SIZE_LABEL[h.tamanio] || h.tamanio}
                        </span>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span
                          style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "8px",
                            letterSpacing: "1px",
                            color:
                              h.accion === "reserved" ? "#00e5ff" : "#ff4040",
                            border: `1px solid ${h.accion === "reserved" ? "rgba(0,229,255,0.2)" : "rgba(255,60,60,0.2)"}`,
                            padding: "2px 6px",
                          }}
                        >
                          {h.accion.toUpperCase()}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          color: "#c8dff5",
                          fontSize: "13px",
                          maxWidth: "80px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h.usuario || "-"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "10px",
                          color: "#4a9aba",
                        }}
                      >
                        {maskEmail(h.email)}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "9px",
                          color: "#3a6a80",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(h.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
