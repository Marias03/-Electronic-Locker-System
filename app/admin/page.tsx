"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [casilleros, setCasilleros] = useState([]);
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const ADMIN_PASSWORD = "admin1234";

  function login() {
    if (password === ADMIN_PASSWORD) {
      setAutenticado(true);
      setError("");
      cargarCasilleros();
    } else {
      setError("Incorrect password");
    }
  }

  async function cargarCasilleros() {
    const res = await fetch("/api/casilleros");
    const data = await res.json();
    setCasilleros(data);
  }

  async function liberarCasillero(id: number) {
    await fetch(`/api/casilleros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: false, pin: null, forzar: true }),
    });
    cargarCasilleros();
  }

  if (!autenticado) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 rounded-2xl p-8 text-center max-w-sm w-full mx-4">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-white text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-slate-400 mb-6">Enter admin password</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="bg-slate-700 text-white border border-slate-600 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={login}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium w-full"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  const ocupados = casilleros.filter((c: any) => c.ocupado);
  const disponibles = casilleros.filter((c: any) => !c.ocupado);

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">🛠️ Admin Panel</h1>
            <p className="text-slate-400">Electronic Locker System</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            ← Back to App
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {casilleros.length}
            </div>
            <div className="text-slate-400 text-sm">Total Lockers</div>
          </div>
          <div className="bg-red-900 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {ocupados.length}
            </div>
            <div className="text-slate-400 text-sm">Occupied</div>
          </div>
          <div className="bg-green-900 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {disponibles.length}
            </div>
            <div className="text-slate-400 text-sm">Available</div>
          </div>
        </div>

        {/* Tabla de casilleros ocupados */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">
            🔒 Occupied Lockers
          </h2>
          {ocupados.length === 0 ? (
            <p className="text-slate-500 text-center py-4">
              No occupied lockers
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-sm border-b border-slate-700">
                  <th className="text-left py-2 px-3">#</th>
                  <th className="text-left py-2 px-3">Size</th>
                  <th className="text-left py-2 px-3">User</th>
                  <th className="text-left py-2 px-3">PIN</th>
                  <th className="text-left py-2 px-3">Reserved at</th>
                  <th className="text-left py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {ocupados.map((c: any) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30"
                  >
                    <td className="py-3 px-3 text-white font-bold">
                      #{c.numero}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-xs font-semibold uppercase px-2 py-1 rounded-full ${
                          c.tamanio === "pequeño"
                            ? "bg-blue-900 text-blue-400"
                            : c.tamanio === "mediano"
                            ? "bg-yellow-900 text-yellow-400"
                            : "bg-purple-900 text-purple-400"
                        }`}
                      >
                        {c.tamanio === "pequeño"
                          ? "Small"
                          : c.tamanio === "mediano"
                          ? "Medium"
                          : "Large"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-white">👤 {c.usuario}</td>
                    <td className="py-3 px-3">
                      <span className="bg-slate-700 text-green-400 font-mono font-bold px-3 py-1 rounded-lg tracking-widest">
                        {c.pin}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-sm">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => liberarCasillero(c.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg"
                      >
                        Force Release
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Tabla de casilleros disponibles */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">
            🔓 Available Lockers
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {disponibles.map((c: any) => (
              <div
                key={c.id}
                className="bg-slate-700 rounded-xl p-3 text-center"
              >
                <div className="text-white font-bold">#{c.numero}</div>
                <div
                  className={`text-xs mt-1 ${
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
