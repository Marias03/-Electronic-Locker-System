"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

interface Props {
  onClose: () => void;
}

export default function SucursalSelector({ onClose }: Props) {
  const [sucursales, setSucursales] = useState([]);
  const [selected, setSelected] = useState<any>(null);
  const router = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    fetch("/api/sucursales")
      .then((r) => r.json())
      .then(setSucursales);
  }, []);

  function handleSelect(sucursal: any) {
    setSelected(sucursal);
  }

  function handleGo() {
    if (!selected) return;
    onClose();
    router.push(`/sucursal/${selected.slug}`);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "#050b14",
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "'Rajdhani', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        gap: "20px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#00e5ff",
            marginBottom: "6px",
          }}
        >
          SELECT LOCATION
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#e8f4ff",
          }}
        >
          Electronic Locker System
        </div>
      </div>

      {/* Map */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          height: "340px",
          border: "1px solid rgba(0,229,255,0.2)",
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
            background: "rgba(0,229,255,0.4)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "6px",
            width: "8px",
            height: "8px",
            borderTop: "1px solid #00e5ff",
            borderLeft: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            width: "8px",
            height: "8px",
            borderTop: "1px solid #00e5ff",
            borderRight: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            left: "6px",
            width: "8px",
            height: "8px",
            borderBottom: "1px solid #00e5ff",
            borderLeft: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            width: "8px",
            height: "8px",
            borderBottom: "1px solid #00e5ff",
            borderRight: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />
        <MapComponent
          sucursales={sucursales}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>

      {/* Selected info */}
      <div style={{ minHeight: "40px", textAlign: "center" }}>
        {selected ? (
          <div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#00e5ff",
              }}
            >
              📍 {selected.nombre}
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                letterSpacing: "1px",
                color: "#3a6a80",
                marginTop: "4px",
              }}
            >
              {selected.ciudad} — {t(selected.tipo)}
            </div>
          </div>
        ) : (
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#2a4a60",
            }}
          >
            CLICK ON A MARKER TO SELECT
          </div>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleGo}
        disabled={!selected}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          letterSpacing: "3px",
          padding: "12px 40px",
          border: selected
            ? "1px solid #00e5ff"
            : "1px solid rgba(0,229,255,0.2)",
          background: selected ? "rgba(0,229,255,0.08)" : "transparent",
          color: selected ? "#00e5ff" : "#2a4a60",
          cursor: selected ? "pointer" : "not-allowed",
          textTransform: "uppercase",
          transition: "all 0.2s",
        }}
      >
        ACCESS TERMINAL →
      </button>
    </div>
  );
}
