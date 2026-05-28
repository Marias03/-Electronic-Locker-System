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
    addressValue: "Kazan International Airport",
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
    subtitle: "AEROPUERTO INTERNACIONAL DE KAZÁN — RUSIA",
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
    title: "Камера хранения",
    subtitle: "АЭРОПОРТ КАЗАНЬ — ТАТАРСТАН, РОССИЯ",
    addressLabel: "АДРЕС",
    addressValue: "Аэропорт Казань",
    hoursLabel: "ЧАСЫ",
    hoursValue: "24/7 — Всегда Открыто",
    unitsLabel: "ЯЧЕЙКИ",
    unitsValue: "20 Ячеек Доступно",
    button: "ВОЙТИ В ТЕРМИНАЛ →",
  },
  {
    lang: "中文",
    terminalLocation: "航站楼位置",
    title: "电子储物柜系统",
    subtitle: "喀山国际机场 — 俄罗斯",
    addressLabel: "地址",
    addressValue: "喀山国际机场",
    hoursLabel: "时间",
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
      className="fixed inset-0 z-50 overflow-y-auto bg-[#050b14]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-8">
        {/* Lang buttons */}
        <div className="flex gap-2 mb-5 flex-wrap justify-center">
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

        {/* Text — altura fija para que no se mueva */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s ease",
            padding: "0 16px",
            width: "100%",
            maxWidth: "600px",
            height: "90px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "9px",
              letterSpacing: "3px",
              color: "#00e5ff",
              marginBottom: "6px",
            }}
          >
            {t.terminalLocation}
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#e8f4ff",
              marginBottom: "4px",
              lineHeight: 1.2,
            }}
          >
            {t.title}
          </div>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "9px",
              letterSpacing: "1px",
              color: "#3a6a80",
            }}
          >
            {t.subtitle}
          </div>
        </div>

        {/* Map */}
        <div
          className="w-full max-w-2xl relative mb-5"
          style={{ border: "1px solid rgba(0,229,255,0.2)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px z-10"
            style={{ background: "rgba(0,229,255,0.4)" }}
          />
          <div
            className="absolute top-1.5 left-1.5 w-2 h-2 z-20"
            style={{
              borderTop: "1px solid #00e5ff",
              borderLeft: "1px solid #00e5ff",
            }}
          />
          <div
            className="absolute top-1.5 right-1.5 w-2 h-2 z-20"
            style={{
              borderTop: "1px solid #00e5ff",
              borderRight: "1px solid #00e5ff",
            }}
          />
          <div
            className="absolute bottom-1.5 left-1.5 w-2 h-2 z-20"
            style={{
              borderBottom: "1px solid #00e5ff",
              borderLeft: "1px solid #00e5ff",
            }}
          />
          <div
            className="absolute bottom-1.5 right-1.5 w-2 h-2 z-20"
            style={{
              borderBottom: "1px solid #00e5ff",
              borderRight: "1px solid #00e5ff",
            }}
          />

          {/* Overlay que bloquea interacción con el mapa */}
          <div className="absolute inset-0 z-30" />

          {!mapLoaded && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10"
              style={{ background: "rgba(2,12,24,0.9)" }}
            >
              <div
                className="w-7 h-7 rounded-full"
                style={{
                  border: "1px solid rgba(0,229,255,0.2)",
                  borderTop: "1px solid #00e5ff",
                  animation: "spin 1s linear infinite",
                }}
              />
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "9px",
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
            height="220"
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

        {/* Info — altura fija */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s ease",
            height: "60px",
            alignItems: "center",
            width: "100%",
            maxWidth: "600px",
            padding: "0 16px",
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
                style={{ fontSize: "12px", color: "#c8dff5", fontWeight: 500 }}
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
            padding: "12px 32px",
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
