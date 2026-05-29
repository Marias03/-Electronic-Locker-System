"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import "../../../../i18n.js";

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

export default function SucursalAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { t } = useTranslation("common");

  const [sucursal, setSucursal] = useState<any>(null);
  const [casilleros, setCasilleros] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin");
    if (session && slug) {
      cargarDatos();
    }
  }, [session, status, slug]);

  async function cargarDatos() {
    const [sucRes, casRes, pagRes] = await Promise.all([
      fetch("/api/sucursales"),
      fetch("/api/casilleros?sucursal=" + slug),
      fetch("/api/pagos"),
    ]);
    const sucursales = await sucRes.json();
    const found = sucursales.find((s: any) => s.slug === slug);
    setSucursal(found || null);
    setCasilleros(await casRes.json());
    setPagos(await pagRes.json());
  }

  async function liberarCasillero(id: number) {
    await fetch("/api/casilleros/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: false, pin: null, forzar: true }),
    });
    cargarDatos();
  }

  if (status === "loading" || !sucursal)
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
            fontFamily: "Share Tech Mono, monospace",
            fontSize: "12px",
            letterSpacing: "3px",
            color: "#00e5ff",
          }}
        >
          LOADING...
        </div>
      </main>
    );

  const ocupados = casilleros.filter((c: any) => c.ocupado);
  const disponibles = casilleros.filter((c: any) => !c.ocupado);
  const total = pagos.reduce((sum: number, p: any) => sum + p.monto, 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050b14",
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "Rajdhani, sans-serif",
        color: "#c8dff5",
      }}
    >
      {/* Header */}
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
              border: "1px solid #00e5ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              flexShrink: 0,
            }}
          >
            📍
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
              {sucursal.nombre}
            </div>
            <div
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "9px",
                color: "#3a5a70",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {sucursal.ciudad} — {t(sucursal.tipo)} — SECTOR {sucursal.sector}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          <button
            onClick={() => router.push("/sucursal/" + slug)}
            style={{
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "9px",
              padding: "6px 8px",
              border: "1px solid rgba(0,229,255,0.2)",
              background: "transparent",
              color: "#4a9aba",
              cursor: "pointer",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            VIEW →
          </button>
          <button
            onClick={() => router.push("/admin/sucursales")}
            style={{
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "9px",
              padding: "6px 8px",
              border: "1px solid rgba(0,229,255,0.2)",
              background: "transparent",
              color: "#4a9aba",
              cursor: "pointer",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            ← BRANCHES
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-10 py-6">
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "1px solid rgba(0,229,255,0.1)",
            marginBottom: "24px",
          }}
        >
          {[
            {
              label: t("totalUnits").toUpperCase(),
              value: casilleros.length,
              color: "#7a9ab0",
              bar: "#334a5a",
            },
            {
              label: t("occupied").toUpperCase(),
              value: String(ocupados.length).padStart(2, "0"),
              color: "#ff4040",
              bar: "#ff4040",
            },
            {
              label: t("available").toUpperCase(),
              value: String(disponibles.length).padStart(2, "0"),
              color: "#00e5ff",
              bar: "#00e5ff",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                padding: "16px 22px",
                position: "relative",
                borderRight: i < 2 ? "1px solid rgba(0,229,255,0.1)" : "none",
                background: "#050b14",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: s.bar,
                }}
              />
              <div
                style={{
                  fontFamily: "Share Tech Mono, monospace",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "#4a9aba",
                  marginBottom: "6px",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 600,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Revenue */}
        <div
          style={{
            border: "1px solid rgba(0,229,255,0.12)",
            background: "rgba(2,12,24,0.7)",
            padding: "16px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#4a9aba",
            }}
          >
            {t("totalRevenue").toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "24px",
              color: "#00e5ff",
              letterSpacing: "2px",
            }}
          >
            ₽{total}
          </div>
        </div>

        {/* Occupied */}
        <div
          style={{
            border: "1px solid rgba(0,229,255,0.12)",
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
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#ff4040",
            }}
          >
            {t("occupiedUnits").toUpperCase()}
          </span>
          {ocupados.length === 0 ? (
            <div
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "11px",
                color: "#3a5a70",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              {t("noOccupiedLockers").toUpperCase()}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "400px",
                }}
              >
                <thead>
                  <tr>
                    {["#", t("size"), t("user"), "PIN", t("action")].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            fontFamily: "Share Tech Mono, monospace",
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
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {ocupados.map((c: any) => (
                    <tr
                      key={c.id}
                      style={{ borderBottom: "1px solid rgba(0,229,255,0.05)" }}
                    >
                      <td
                        style={{
                          padding: "10px",
                          fontFamily: "Share Tech Mono, monospace",
                          fontSize: "12px",
                          color: "#e8f4ff",
                        }}
                      >
                        #{String(c.numero).padStart(2, "0")}
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span
                          style={{
                            fontFamily: "Share Tech Mono, monospace",
                            fontSize: "8px",
                            color: SIZE_COLOR[c.tamanio],
                            border: "1px solid " + SIZE_COLOR[c.tamanio] + "40",
                            padding: "2px 6px",
                          }}
                        >
                          {SIZE_LABEL[c.tamanio]}
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
                        {c.usuario}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          fontFamily: "Share Tech Mono, monospace",
                          fontSize: "13px",
                          color: "#00e5ff",
                          letterSpacing: "4px",
                        }}
                      >
                        {c.pin}
                      </td>
                      <td style={{ padding: "10px" }}>
                        <button
                          onClick={() => liberarCasillero(c.id)}
                          style={{
                            fontFamily: "Share Tech Mono, monospace",
                            fontSize: "8px",
                            padding: "5px 8px",
                            background: "rgba(255,60,60,0.07)",
                            border: "1px solid rgba(255,60,60,0.3)",
                            color: "#ff4040",
                            cursor: "pointer",
                            textTransform: "uppercase",
                          }}
                        >
                          {t("forceRelease")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Available */}
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
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#00e5ff",
            }}
          >
            {t("availableUnits").toUpperCase()}
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            {disponibles.map((c: any) => (
              <div
                key={c.id}
                style={{
                  border: "1px solid rgba(0,229,255,0.12)",
                  background: "rgba(0,10,20,0.9)",
                  padding: "10px 6px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "rgba(0,229,255,0.2)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Share Tech Mono, monospace",
                    fontSize: "12px",
                    color: "#c8dff5",
                    marginBottom: "3px",
                  }}
                >
                  #{String(c.numero).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "Share Tech Mono, monospace",
                    fontSize: "8px",
                    color: SIZE_COLOR[c.tamanio],
                  }}
                >
                  {SIZE_LABEL[c.tamanio]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
