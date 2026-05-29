"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import "../../../i18n.js";

export default function SucursalesAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation("common");
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    tipo: "airport",
    ciudad: "",
    direccion: "",
    lat: "",
    lng: "",
    slug: "",
    pequeños: "10",
    medianos: "5",
    grandes: "5",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function cargarSucursales() {
    const res = await fetch("/api/sucursales");
    setSucursales(await res.json());
  }

  async function eliminarSucursal(id: number) {
    if (!confirm("Delete this branch and all its lockers?")) return;
    const res = await fetch("/api/sucursales", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) cargarSucursales();
  }

  async function crearSucursal() {
    if (!form.nombre || !form.ciudad || !form.lat || !form.lng || !form.slug) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/sucursales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        tipo: form.tipo,
        ciudad: form.ciudad,
        direccion: form.direccion,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        slug: form.slug,
        pequeños: parseInt(form.pequeños),
        medianos: parseInt(form.medianos),
        grandes: parseInt(form.grandes),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(t("branchCreated"));
      setForm({
        nombre: "",
        tipo: "airport",
        ciudad: "",
        direccion: "",
        lat: "",
        lng: "",
        slug: "",
        pequeños: "10",
        medianos: "5",
        grandes: "5",
      });
      cargarSucursales();
      setTimeout(() => setSuccess(""), 3000);
    }
  }

  if (status === "loading")
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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,229,255,0.03)",
    border: "1px solid rgba(0,229,255,0.2)",
    color: "#c8dff5",
    fontFamily: "Share Tech Mono, monospace",
    fontSize: "12px",
    padding: "8px 12px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Share Tech Mono, monospace",
    fontSize: "9px",
    letterSpacing: "2px",
    color: "#4a9aba",
    marginBottom: "5px",
    display: "block",
  };

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
            🏢
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
              {t("branches")}
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
              Electronic Locker System
            </div>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin")}
          style={{
            fontFamily: "Share Tech Mono, monospace",
            fontSize: "9px",
            letterSpacing: "1px",
            padding: "6px 8px",
            border: "1px solid rgba(0,229,255,0.2)",
            background: "transparent",
            color: "#4a9aba",
            cursor: "pointer",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          ← ADMIN
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-10 py-6">
        <div
          style={{
            border: "1px solid rgba(0,229,255,0.12)",
            background: "rgba(2,12,24,0.7)",
            padding: "22px 16px",
            position: "relative",
            marginBottom: "24px",
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
            {t("activeBranches").toUpperCase()}
          </span>
          {sucursales.length === 0 ? (
            <div
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "11px",
                color: "#3a5a70",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              {t("noBranches").toUpperCase()}
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {sucursales.map((s: any) => (
                <div
                  key={s.id}
                  style={{
                    border: "1px solid rgba(0,229,255,0.1)",
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1, overflow: "hidden" }}>
                    <div
                      style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: "11px",
                        color: "#c8dff5",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.nombre}
                    </div>
                    <div
                      style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: "9px",
                        color: "#3a6a80",
                        marginTop: "3px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.ciudad} — {t(s.tipo)} — SECTOR {s.sector}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                    <button
                      onClick={() => router.push("/admin/sucursales/" + s.slug)}
                      style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: "8px",
                        padding: "4px 8px",
                        border: "1px solid rgba(0,229,255,0.2)",
                        background: "transparent",
                        color: "#4a9aba",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ADMIN →
                    </button>
                    <button
                      onClick={() => eliminarSucursal(s.id)}
                      style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: "8px",
                        padding: "4px 8px",
                        border: "1px solid rgba(255,60,60,0.3)",
                        background: "transparent",
                        color: "#ff4040",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("deleteBranch")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
            {t("addNewBranch").toUpperCase()}
          </span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <label style={labelStyle}>{t("branchName").toUpperCase()}</label>
              <input
                style={inputStyle}
                placeholder="Kazan Airport"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle}>{t("branchType").toUpperCase()}</label>
              <select
                style={inputStyle}
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="airport">{t("airport")}</option>
                <option value="hotel">{t("hotel")}</option>
                <option value="mall">{t("mall")}</option>
                <option value="station">{t("station")}</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>{t("branchCity").toUpperCase()}</label>
              <input
                style={inputStyle}
                placeholder="Kazan"
                value={form.ciudad}
                onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle}>{t("branchSlug").toUpperCase()}</label>
              <input
                style={inputStyle}
                placeholder="kazan-airport"
                value={form.slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    slug: e.target.value.toLowerCase().replace(/\s/g, "-"),
                  })
                }
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                {t("branchAddress").toUpperCase()}
              </label>
              <input
                style={inputStyle}
                placeholder="Kazan International Airport, Russia"
                value={form.direccion}
                onChange={(e) =>
                  setForm({ ...form, direccion: e.target.value })
                }
              />
            </div>
            <div>
              <label style={labelStyle}>{t("branchLat").toUpperCase()}</label>
              <input
                style={inputStyle}
                placeholder="55.6062"
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle}>{t("branchLng").toUpperCase()}</label>
              <input
                style={inputStyle}
                placeholder="49.2784"
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ ...labelStyle, marginBottom: "8px" }}>
              {t("lockersToGenerate").toUpperCase()}
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label style={{ ...labelStyle, color: "#00e5ff" }}>
                  {t("small").toUpperCase()}
                </label>
                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  value={form.pequeños}
                  onChange={(e) =>
                    setForm({ ...form, pequeños: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={{ ...labelStyle, color: "#f0a500" }}>
                  {t("medium").toUpperCase()}
                </label>
                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  value={form.medianos}
                  onChange={(e) =>
                    setForm({ ...form, medianos: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={{ ...labelStyle, color: "#a78bfa" }}>
                  {t("large").toUpperCase()}
                </label>
                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  value={form.grandes}
                  onChange={(e) =>
                    setForm({ ...form, grandes: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {error && (
            <div
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "10px",
                color: "#ff4040",
                marginBottom: "12px",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "10px",
                color: "#00e5ff",
                marginBottom: "12px",
              }}
            >
              {success}
            </div>
          )}

          <button
            onClick={crearSucursal}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(0,229,255,0.08)",
              border: "1px solid #00e5ff",
              color: "#00e5ff",
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              cursor: loading ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading
              ? t("creating").toUpperCase()
              : t("createBranch").toUpperCase()}
          </button>
        </div>
      </div>
    </main>
  );
}
