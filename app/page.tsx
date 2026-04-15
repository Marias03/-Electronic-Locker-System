"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import LanguageSwitcher from "./components/LanguageSwitcher";
import LockerCard from "./components/LockerCard";
import Stats from "./components/Stats";
import PinReceived from "./components/PinReceived";
import PinRelease from "./components/PinRelease";

export default function Home() {
  const { t } = useTranslation("common");
  const [casilleros, setCasilleros] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [filtro, setFiltro] = useState("all");
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

  async function cargarCasilleros() {
    const res = await fetch("/api/casilleros");
    const data = await res.json();
    setCasilleros(data);
  }

  async function reservar(id: number, numero: number) {
    if (!usuario.trim()) {
      alert(t("enterNameFirst"));
      return;
    }
    const res = await fetch(`/api/casilleros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: true, usuario }),
    });
    const data = await res.json();
    setPinMostrado({ numero, pin: data.pin });
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
    <main className="min-h-screen bg-slate-900 p-2 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <LanguageSwitcher />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-1">
            🧳 {t("title")}
          </h1>
          <p className="text-slate-400">{t("subtitle")}</p>
        </div>

        <Stats
          total={casilleros.length}
          disponibles={casilleros.filter((c: any) => !c.ocupado).length}
          ocupados={casilleros.filter((c: any) => c.ocupado).length}
        />
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder={t("enterName")}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="bg-slate-800 text-white border border-slate-600 rounded-xl px-4 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
          />
        </div>

        <div className="flex gap-2 justify-center mb-8">
          {[
            { key: "all", label: t("all") },
            { key: "pequeño", label: t("small") },
            { key: "mediano", label: t("medium") },
            { key: "grande", label: t("large") },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filtro === f.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2">
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
