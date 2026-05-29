"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import "../../../i18n.js";
import Header from "../../components/Header";
import ReservationPanel from "../../components/ReservationPanel";
import LockersGrid from "../../components/LockersGrid";
import Stats from "../../components/Stats";
import PinReceived from "../../components/PinReceived";
import PinRelease from "../../components/PinRelease";
import Toast from "../../components/Toast";
import LoadingOverlay from "../../components/LoadingOverlay";
import PaymentModal from "../../components/PaymentModal";

const PRICES: Record<string, number> = {
  pequeño: 100,
  mediano: 150,
  grande: 200,
};

export default function SucursalPage() {
  const { t } = useTranslation("common");
  const params = useParams();
  const slug = params?.slug as string;

  const [sucursal, setSucursal] = useState<any>(null);
  const [casilleros, setCasilleros] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [filtro, setFiltro] = useState("all");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{
    id: number;
    numero: number;
    tamanio: string;
  } | null>(null);
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
    if (slug) {
      cargarSucursal();
      cargarCasilleros();
    }
  }, [slug]);

  async function cargarSucursal() {
    const res = await fetch("/api/sucursales");
    const sucursales = await res.json();
    const found = sucursales.find((s: any) => s.slug === slug);
    setSucursal(found || null);
  }

  async function cargarCasilleros() {
    const res = await fetch(`/api/casilleros?sucursal=${slug}`);
    setCasilleros(await res.json());
  }

  function mostrarToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  async function reservar(id: number, numero: number) {
    if (!privacyAccepted) return mostrarToast(t("acceptPrivacy"));
    if (!usuario.trim()) return mostrarToast(t("enterNameFirst"));
    if (!email.trim()) return mostrarToast(t("enterEmailFirst"));
    const casillero = casilleros.find((c: any) => c.id === id) as any;
    setPaymentModal({ id, numero, tamanio: casillero.tamanio });
  }

  async function confirmarReserva() {
    if (!paymentModal) return;
    setPaymentModal(null);
    setLoading(true);

    await fetch("/api/pagos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numero: paymentModal.numero,
        tamanio: paymentModal.tamanio,
        usuario,
        email,
        monto: PRICES[paymentModal.tamanio] || 100,
      }),
    });

    const res = await fetch(`/api/casilleros/${paymentModal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocupado: true, usuario, email }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) return mostrarToast(t("maxLockersReached"));
    setPinMostrado({ numero: paymentModal.numero, pin: data.pin });
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

  if (!sucursal) {
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
          LOADING...
        </div>
      </main>
    );
  }

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
      <Header />

      {/* Sucursal info */}
      <div
        style={{
          borderBottom: "1px solid rgba(0,229,255,0.08)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(0,229,255,0.02)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "2px",
            color: "#00e5ff",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          📍 {sucursal.nombre} — {sucursal.ciudad}
        </div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "1px",
            color: "#3a5a70",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          {t(sucursal.tipo)}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-10 py-6">
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
          sector={sucursal.sector}
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

      {paymentModal && (
        <PaymentModal
          numero={paymentModal.numero}
          tamanio={paymentModal.tamanio}
          onSuccess={confirmarReserva}
          onClose={() => setPaymentModal(null)}
        />
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </main>
  );
}
