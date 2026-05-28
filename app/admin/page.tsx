"use client";
import { useEffect, useState } from "react";
import AdminLogin from "./components/AdminLogin";
import AdminHeader from "./components/AdminHeader";
import AdminStats from "./components/AdminStats";
import OccupiedTable from "./components/OccupiedTable";
import AvailableGrid from "./components/AvailableGrid";

export default function Admin() {
  const [casilleros, setCasilleros] = useState([]);
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    setCasilleros(await res.json());
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
      <AdminLogin
        password={password}
        error={error}
        onChange={setPassword}
        onLogin={login}
      />
    );
  }

  const ocupados = casilleros.filter((c: any) => c.ocupado);
  const disponibles = casilleros.filter((c: any) => !c.ocupado);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050b14",
        backgroundImage:
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "'Rajdhani', sans-serif",
        color: "#c8dff5",
      }}
    >
      <AdminHeader />

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 40px" }}
      >
        <AdminStats
          total={casilleros.length}
          ocupados={ocupados.length}
          disponibles={disponibles.length}
        />
        <OccupiedTable ocupados={ocupados} onForceRelease={liberarCasillero} />
        <AvailableGrid disponibles={disponibles} />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </main>
  );
}
