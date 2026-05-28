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
    subtitle: "KAZAN INTL AIRPORT — RUSSIA",
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
    title: "Sistema de Casilleros",
    subtitle: "AEROPUERTO DE KAZÁN — RUSIA",
    addressLabel: "DIRECCIÓN",
    addressValue: "Aeropuerto de Kazán",
    hoursLabel: "HORARIO",
    hoursValue: "24/7 — Siempre Abierto",
    unitsLabel: "UNIDADES",
    unitsValue: "20 Casilleros",
    button: "ACCEDER →",
  },
  {
    lang: "RU",
    terminalLocation: "МЕСТО ТЕРМИНАЛА",
    title: "Камера хранения",
    subtitle: "АЭРОПОРТ КАЗАНЬ — РОССИЯ",
    addressLabel: "АДРЕС",
    addressValue: "Аэропорт Казань",
    hoursLabel: "ЧАСЫ",
    hoursValue: "24/7 — Открыто",
    unitsLabel: "ЯЧЕЙКИ",
    unitsValue: "20 Ячеек",
    button: "ВОЙТИ →",
  },
  {
    lang: "中文",
    terminalLocation: "航站楼位置",
    title: "电子储物柜",
    subtitle: "喀山机场 — 俄罗斯",
    addressLabel: "地址",
    addressValue: "喀山国际机场",
    hoursLabel: "时间",
    hoursValue: "24/7 开放",
    unitsLabel: "储物柜",
    unitsValue: "20个可用",
    button: "进入 →",
  },
];

export default function LocationMap({ onContinue }: Props) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % TRANSLATIONS.length);
        setVisible(true);
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
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 gap-4">
        {/* Lang buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {TRANSLATIONS.map((l, i) => (
            <button
              key={l.lang}
              onClick={() => {
                setVisible(false);
                setTimeout(() => {
                  setCurrent(i);
                  setVisible(true);
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

        {/* Bloque de texto — tamaño fijo, solo el contenido cambia */}
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            height: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "9px",
              letterSpacing: "3px",
              color: "#00e5ff",
              marginBottom: "5px",
              whiteSpace: "nowrap",
            }}
          >
            {t.terminalLocation}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#e8f4ff",
              marginBottom: "4px",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textAlign: "center",
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
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textAlign: "center",
            }}
          >
            {t.subtitle}
          </div>
        </div>

        {/* Map */}
        <div
          className="w-full max-w-xl relative"
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
            height="200"
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

        {/* Info — tamaño fijo */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "nowrap",
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
            width: "100%",
            maxWidth: "560px",
            height: "52px",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {[
            { label: t.addressLabel, value: t.addressValue },
            { label: t.hoursLabel, value: t.hoursValue },
            { label: t.unitsLabel, value: t.unitsValue },
          ].map((item) => (
            <div
              key={item.label}
              style={{ textAlign: "center", flex: 1, minWidth: 0 }}
            >
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "2px",
                  color: "#4a9aba",
                  marginBottom: "3px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#c8dff5",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
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
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
            whiteSpace: "nowrap",
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
