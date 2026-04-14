"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [casilleros, setCasilleros] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [filtro, setFiltro] = useState("all");

  useEffect(() => {
    cargarCasilleros();
  }, []);

  async function cargarCasilleros() {
    const res = await fetch("/api/casilleros");
    const data = await res.json();
    setCasilleros(data);
  }

  async function reservar(id: number) {
    if (!usuario.trim()) {
      alert("Please enter your name first");
      return;
    }
    await fetch(`/api/casilleros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: true, usuario }),
    });
    cargarCasilleros();
  }

  async function liberar(id: number) {
    await fetch(`/api/casilleros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: false, usuario: null }),
    });
    cargarCasilleros();
  }

  const casillerosFiltrados = casilleros.filter((c: any) =>
    filtro === "all" ? true : c.tamanio === filtro
  );

  const disponibles = casilleros.filter((c: any) => !c.ocupado).length;
  const ocupados = casilleros.filter((c: any) => c.ocupado).length;

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-1">
            🧳 Electronic Locker System
          </h1>
          <p className="text-slate-400">
            Select a locker size and reserve your space
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {casilleros.length}
            </div>
            <div className="text-slate-400 text-sm">Total</div>
          </div>
          <div className="bg-green-900 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {disponibles}
            </div>
            <div className="text-slate-400 text-sm">Available</div>
          </div>
          <div className="bg-red-900 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{ocupados}</div>
            <div className="text-slate-400 text-sm">Occupied</div>
          </div>
        </div>

        {/* Name input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Enter your name to reserve a locker"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="bg-slate-800 text-white border border-slate-600 rounded-xl px-4 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 justify-center mb-8">
          {[
            { key: "all", label: "All" },
            { key: "pequeño", label: "Small" },
            { key: "mediano", label: "Medium" },
            { key: "grande", label: "Large" },
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

        {/* Locker grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {casillerosFiltrados.map((c: any) => (
            <div
              key={c.id}
              className={`rounded-2xl p-5 text-center transition-all ${
                c.ocupado
                  ? "bg-slate-800 border border-red-500/40"
                  : "bg-slate-800 border border-green-500/40 hover:border-green-400"
              }`}
            >
              <div className="text-3xl mb-2">{c.ocupado ? "🔒" : "🔓"}</div>
              <div className="text-white font-bold text-xl">#{c.numero}</div>
              <div
                className={`text-xs font-semibold uppercase tracking-wide mt-1 mb-3 ${
                  c.tamanio === "pequeño"
                    ? "text-blue-400"
                    : c.tamanio === "mediano"
                    ? "text-yellow-400"
                    : "text-purple-400"
                }`}
              >
                {c.tamanio === "pequeño"
                  ? "Small"
                  : c.tamanio === "mediano"
                  ? "Medium"
                  : "Large"}
              </div>
              {c.ocupado && (
                <div className="text-xs text-red-400 mb-3">👤 {c.usuario}</div>
              )}
              <button
                onClick={() => (c.ocupado ? liberar(c.id) : reservar(c.id))}
                className={`w-full py-2 rounded-lg text-white text-sm font-semibold transition-all ${
                  c.ocupado
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {c.ocupado ? "Release" : "Reserve"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
