"use client";
import { useState, useEffect } from "react";

interface Props {
  onContinue: () => void;
}

const TRANSLATIONS = [
  {
    lang: "EN",
    terminalLocation: "TERMINAL LOCATION",
    title: "Electronic Locker System",
    subtitle: "KAZAN INTERNATIONAL AIRPORT — TATARSTAN, RUSSIA",
    addressLabel: "ADDRESS",
    addressValue: "Kazan International Airport, Kazan",
    hoursLabel: "HOURS",
    hoursValue: "24/7 — Always Open",
    unitsLabel: "UNITS",
    unitsValue: "20 Lockers Available",
    button: "ACCESS TERMINAL →",
  },
  {
    lang: "ES",
    terminalLocation: "UBICACIÓN DEL TERMINAL",
    title: "Sistema Electrónico de Casilleros",
    subtitle: "AEROPUERTO INTERNACIONAL DE KAZÁN — TARTARISTÁN, RUSIA",
    addressLabel: "DIRECCIÓN",
    addressValue: "Aeropuerto Internacional de Kazán",
    hoursLabel: "HORARIO",
    hoursValue: "24/7 — Siempre Abierto",
    unitsLabel: "UNIDADES",
    unitsValue: "20 Casilleros Disponibles",
    button: "ACCEDER AL TERMINAL →",
  },
  {
    lang: "RU",
    terminalLocation: "РАСПОЛОЖЕНИЕ ТЕРМИНАЛА",
    title: "Электронная камера хранения",
    subtitle: "МЕЖДУНАРОДНЫЙ АЭРОПОРТ КАЗАНЬ — ТАТАРСТАН, РОССИЯ",
    addressLabel: "АДРЕС",
    addressValue: "Международный аэропорт Казань",
    hoursLabel: "ЧАСЫ РАБОТЫ",
    hoursValue: "24/7 — Всегда Открыто",
    unitsLabel: "ЯЧЕЙКИ",
    unitsValue: "20 Ячеек Доступно",
    button: "ВОЙТИ В ТЕРМИНАЛ →",
  },
  {
    lang: "中文",
    terminalLocation: "航站楼位置",
    title: "电子储物柜系统",
    subtitle: "喀山国际机场 — 鞑靼斯坦，俄罗斯",
    addressLabel: "地址",
    addressValue: "喀山国际机场",
    hoursLabel: "营业时间",
    hoursValue: "24/7 — 全天开放",
    unitsLabel: "储物柜",
    unitsValue: "20个储物柜可用",
    button: "进入终端 →",
  },
];

export default function LocationMap({ onContinue }: Props) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % TRANSLATIONS.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const t = TRANSLATIONS[current];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050b14",
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 90,
        fontFamily: "'Rajdhani', sans-serif",
        padding: "40px",
      }}
    >
      {/* Lang indicators */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {TRANSLATIONS.map((l, i) => (
          <button
            key={l.lang}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrent(i);
                setFade(true);
              }, 300);
            }}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              letterSpacing: "1px",
              padding: "4px 10px",
              border:
                i === current
                  ? "1px solid #00e5ff"
                  : "1px solid rgba(0,229,255,0.2)",
              background:
                i === current ? "rgba(0,229,255,0.07)" : "transparent",
              color: i === current ? "#00e5ff" : "#3a6a80",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {l.lang}
          </button>
        ))}
      </div>

      {/* Text with fade */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "28px",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#00e5ff",
            marginBottom: "8px",
          }}
        >
          {t.terminalLocation}
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#e8f4ff",
            marginBottom: "4px",
          }}
        >
          {t.title}
        </div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#3a6a80",
          }}
        >
          {t.subtitle}
        </div>
      </div>

      {/* Map */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          border: "1px solid rgba(0,229,255,0.2)",
          position: "relative",
          marginBottom: "24px",
          height: "300px",
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
            top: "8px",
            left: "8px",
            width: "10px",
            height: "10px",
            borderTop: "1px solid #00e5ff",
            borderLeft: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "10px",
            height: "10px",
            borderTop: "1px solid #00e5ff",
            borderRight: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            width: "10px",
            height: "10px",
            borderBottom: "1px solid #00e5ff",
            borderLeft: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            width: "10px",
            height: "10px",
            borderBottom: "1px solid #00e5ff",
            borderRight: "1px solid #00e5ff",
            zIndex: 2,
          }}
        />

        {!mapLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(2,12,24,0.9)",
              zIndex: 1,
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "1px solid rgba(0,229,255,0.2)",
                borderTop: "1px solid #00e5ff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                color: "#3a6a80",
              }}
            >
              LOADING MAP...
            </div>
          </div>
        )}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2253.6395638661993!2d49.27783637688195!3d55.60828640311295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415ea69eb790821d%3A0xc26fb7275009719a!2sKazan%20Airport!5e0!3m2!1sen!2sus!4v1779989334373!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{
            border: 0,
            display: "block",
            filter: "invert(90%) hue-rotate(180deg)",
          }}
          allowFullScreen
          loading="lazy"
          onLoad={() => setMapLoaded(true)}
        />
      </div>

      {/* Info */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          marginBottom: "28px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {[
          { label: t.addressLabel, value: t.addressValue },
          { label: t.hoursLabel, value: t.hoursValue },
          { label: t.unitsLabel, value: t.unitsValue },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                letterSpacing: "2px",
                color: "#4a9aba",
                marginBottom: "4px",
              }}
            >
              {item.label}
            </div>
            <div
              style={{ fontSize: "14px", color: "#c8dff5", fontWeight: 500 }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={onContinue}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          letterSpacing: "3px",
          padding: "12px 40px",
          border: "1px solid #00e5ff",
          background: "rgba(0,229,255,0.08)",
          color: "#00e5ff",
          cursor: "pointer",
          textTransform: "uppercase",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {t.button}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
