"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import LanguageSwitcher from "./components/LanguageSwitcher";
import LockerCard from "./components/LockerCard";
import Stats from "./components/Stats";
import PinReceived from "./components/PinReceived";
import PinRelease from "./components/PinRelease";
import Toast from "./components/Toast";
import LoadingOverlay from "./components/LoadingOverlay";

export default function Home() {
  const { t } = useTranslation("common");
  const [casilleros, setCasilleros] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [filtro, setFiltro] = useState("all");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
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

  function mostrarToast(mensaje: string) {
    setToast(mensaje);
    setTimeout(() => setToast(null), 4000);
  }

  async function cargarCasilleros() {
    const res = await fetch("/api/casilleros");
    setCasilleros(await res.json());
  }

  async function reservar(id: number, numero: number) {
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
    filtro === "all" ? true : c.tamanio === filtro
  );

  return (
    <main className="min-h-screen bg-slate-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <LanguageSwitcher />

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 animated-title">
            🧳 {t("title")}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">{t("subtitle")}</p>
        </div>

        <Stats
          total={casilleros.length}
          disponibles={casilleros.filter((c: any) => !c.ocupado).length}
          ocupados={casilleros.filter((c: any) => c.ocupado).length}
        />

        <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="text"
            placeholder={t("enterName")}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="bg-slate-800 text-white border border-slate-600 rounded-xl px-4 py-3 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition-all"
          />
          <input
            type="email"
            placeholder={t("enterEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 text-white border border-slate-600 rounded-xl px-4 py-3 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition-all"
          />
        </div>

        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {[
            { key: "all", label: t("all") },
            { key: "pequeño", label: t("small") },
            { key: "mediano", label: t("medium") },
            { key: "grande", label: t("large") },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filtro === f.key
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {casillerosFiltrados.map((c: any) => (
            <LockerCard
              key={c.id}
              casillero={c}
              onReservar={reservar}
              onLiberar={(id: number, numero: number) =>
                setPinModal({ id, numero })
              }
            />
          ))}
        </div>
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
  );
}
