"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import AdminLogin from "./components/AdminLogin";
import AdminHeader from "./components/AdminHeader";
import AdminStats from "./components/AdminStats";
import OccupiedTable from "./components/OccupiedTable";
import AvailableGrid from "./components/AvailableGrid";
import PagosTable from "./components/PagosTable";

export default function Admin() {
  const { data: session, status } = useSession();
  const [casilleros, setCasilleros] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      cargarCasilleros();
      cargarPagos();
    }
  }, [session]);

  async function login() {
    const res = await signIn("credentials", { password, redirect: false });
    if (res?.error) {
      setError("Incorrect password");
    } else {
      setError("");
    }
  }

  async function cargarCasilleros() {
    const res = await fetch("/api/casilleros");
    setCasilleros(await res.json());
  }

  async function cargarPagos() {
    const res = await fetch("/api/payments");
    setPagos(await res.json());
  }

  async function liberarCasillero(id: number) {
    await fetch(`/api/casilleros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: false, pin: null, forzar: true }),
    });
    cargarCasilleros();
  }

  if (status === "loading") {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#050b14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "12px",
            letterSpacing: "3px",
            color: "#00e5ff",
          }}
        >
          AUTHENTICATING...
        </div>
      </main>
    );
  }

  if (!session) {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-10 py-6">
        <AdminStats
          total={casilleros.length}
          ocupados={ocupados.length}
          disponibles={disponibles.length}
        />
        <PagosTable pagos={pagos} />
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
