"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import Header from "./components/Header";
import ReservationPanel from "./components/ReservationPanel";
import LockersGrid from "./components/LockersGrid";
import Stats from "./components/Stats";
import PinReceived from "./components/PinReceived";
import PinRelease from "./components/PinRelease";
import Toast from "./components/Toast";
import LoadingOverlay from "./components/LoadingOverlay";
import SplashScreen from "./components/SplashScreen";

export default function Home() {
  const { t } = useTranslation("common");
  const [casilleros, setCasilleros] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [filtro, setFiltro] = useState("all");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [ready, setReady] = useState(false);
  const [pinModal, setPinModal] = useState<{
    id: number;
    numero: number;
  } | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinMostrado, setPinMostrado] = useState<{
    numero: number;
    pin: string;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarCasilleros();
  }, []);

  function mostrarToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  async function cargarCasilleros() {
    const res = await fetch("/api/casilleros");
    setCasilleros(await res.json());
  }

  async function reservar(id: number, numero: number) {
    if (!privacyAccepted) return mostrarToast(t("acceptPrivacy"));
    if (!usuario.trim()) return mostrarToast(t("enterNameFirst"));
    if (!email.trim()) return mostrarToast(t("enterEmailFirst"));
    setLoading(true);
    const res = await fetch(`/api/casilleros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: true, usuario, email }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) return mostrarToast(t("maxLockersReached"));
    setPinMostrado({ numero, pin: data.pin });
    setUsuario("");
    setEmail("");
    setPrivacyAccepted(false);
    cargarCasilleros();
  }

  async function liberar() {
    if (!pinModal) return;
    const res = await fetch(`/api/casilleros/${pinModal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: false, pin: pinInput }),
    });
    const data = await res.json();
    if (data.error) {
      setError(t("incorrectPin"));
    } else {
      setPinModal(null);
      setPinInput("");
      setError("");
      cargarCasilleros();
    }
  }

  const casillerosFiltrados = casilleros.filter((c: any) =>
    filtro === "all" ? true : c.tamanio === filtro,
  );

  return (
    <>
      {!ready && <SplashScreen onComplete={() => setReady(true)} />}

      <main
        style={{
          minHeight: "100vh",
          background: "#050b14",
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "'Rajdhani', sans-serif",
          color: "#c8dff5",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <Header />

        <div
          style={{ maxWidth: "960px", margin: "0 auto", padding: "28px 40px" }}
        >
          <Stats
            total={casilleros.length}
            disponibles={casilleros.filter((c: any) => !c.ocupado).length}
            ocupados={casilleros.filter((c: any) => c.ocupado).length}
          />

          <ReservationPanel
            usuario={usuario}
            email={email}
            privacyAccepted={privacyAccepted}
            filtro={filtro}
            onUsuario={setUsuario}
            onEmail={setEmail}
            onPrivacy={setPrivacyAccepted}
            onFiltro={setFiltro}
          />

          <LockersGrid
            casilleros={casillerosFiltrados}
            onReservar={reservar}
            onLiberar={(id, numero) => setPinModal({ id, numero })}
          />
        </div>

        <Toast message={toast} />
        {loading && <LoadingOverlay />}

        {pinMostrado && (
          <PinReceived
            pinMostrado={pinMostrado}
            onClose={() => setPinMostrado(null)}
          />
        )}

        {pinModal && (
          <PinRelease
            pinModal={pinModal}
            pinInput={pinInput}
            setPinInput={(val: string) => {
              setPinInput(val);
              setError("");
            }}
            error={error}
            onRelease={liberar}
            onClose={() => {
              setPinModal(null);
              setPinInput("");
              setError("");
            }}
          />
        )}
      </main>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </>
  );
}
