"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import "../../../i18n.js";

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
  const router = useRouter();
  const { t } = useTranslation("common");

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
          {t("authenticating").toUpperCase()}
        </div>
      </main>
    );
  }

  // Agrupar por pares: cada reserva con su release correspondiente
  const reservas = historial.filter((h: any) => h.accion === "reserved");
  const releases = historial.filter((h: any) => h.accion === "released");

  const filas = reservas.map((reserva: any) => {
    const release = releases.find(
      (r: any) =>
        r.numero === reserva.numero &&
        r.sucursalId === reserva.sucursalId &&
        new Date(r.createdAt) > new Date(reserva.createdAt),
    );
    return { reserva, release };
  });

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
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "1px solid #00e5ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            📋
          </div>
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#e8f4ff",
              }}
            >
              {t("reservationHistory")}
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                letterSpacing: "1px",
                color: "#3a5a70",
              }}
            >
              Electronic Locker System
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#3a5a70",
            }}
          >
            {filas.length} RECORDS
          </span>
          <button
            onClick={() => router.push("/admin")}
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
            }}
          >
            {t("backToAdmin")}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-10 py-6">
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
            {t("activityLog").toUpperCase()}
          </span>

          {filas.length === 0 ? (
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
              {t("noRecords").toUpperCase()}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "600px",
                }}
              >
                <thead>
                  <tr>
                    {[
                      "#",
                      t("size"),
                      t("user"),
                      "EMAIL",
                      "RESERVED",
                      "RELEASED",
                      "DURATION",
                    ].map((h) => (
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
                          textTransform: "uppercase",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filas.map(({ reserva, release }: any, i: number) => {
                    const reservadoEn = new Date(reserva.createdAt);
                    const liberadoEn = release
                      ? new Date(release.createdAt)
                      : null;
                    const duracionMs = liberadoEn
                      ? liberadoEn.getTime() - reservadoEn.getTime()
                      : null;
                    const duracion = duracionMs
                      ? `${Math.floor(duracionMs / 3600000)}h ${Math.floor((duracionMs % 3600000) / 60000)}m`
                      : "—";

                    return (
                      <tr
                        key={i}
                        style={{
                          borderBottom: "1px solid rgba(0,229,255,0.05)",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px",
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "12px",
                            color: "#e8f4ff",
                          }}
                        >
                          #{String(reserva.numero).padStart(2, "0")}
                        </td>
                        <td style={{ padding: "10px" }}>
                          <span
                            style={{
                              fontFamily: "'Share Tech Mono', monospace",
                              fontSize: "8px",
                              letterSpacing: "1px",
                              color: SIZE_COLOR[reserva.tamanio],
                              border: `1px solid ${SIZE_COLOR[reserva.tamanio]}40`,
                              padding: "2px 6px",
                            }}
                          >
                            {SIZE_LABEL[reserva.tamanio] || reserva.tamanio}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            color: "#c8dff5",
                            fontSize: "13px",
                          }}
                        >
                          {reserva.usuario || "-"}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "10px",
                            color: "#4a9aba",
                          }}
                        >
                          {maskEmail(reserva.email)}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "9px",
                            color: "#00e5ff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {reservadoEn.toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "9px",
                            color: liberadoEn ? "#ff4040" : "#3a5a70",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {liberadoEn ? liberadoEn.toLocaleString() : "ACTIVE"}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "9px",
                            color: "#a78bfa",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {duracion}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
