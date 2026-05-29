import LockerCard from "./LockerCard";
import { useTranslation } from "react-i18next";

interface Casillero {
  id: number;
  numero: number;
  tamanio: string;
  ocupado: boolean;
}

interface Props {
  casilleros: Casillero[];
  onReservar: (id: number, numero: number) => void;
  onLiberar: (id: number, numero: number) => void;
  sector?: string;
}

export default function LockersGrid({
  casilleros,
  onReservar,
  onLiberar,
  sector = "A",
}: Props) {
  const { t } = useTranslation("common");

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <div
          style={{ flex: 1, height: "1px", background: "rgba(0,229,255,0.08)" }}
        />
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            letterSpacing: "3px",
            color: "#4a9aba",
            textTransform: "uppercase",
          }}
        >
          {t("storageUnits")} {sector}
        </span>
        <div
          style={{ flex: 1, height: "1px", background: "rgba(0,229,255,0.08)" }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
        }}
      >
        {casilleros.map((c) => (
          <LockerCard
            key={c.id}
            casillero={c}
            onReservar={onReservar}
            onLiberar={onLiberar}
          />
        ))}
      </div>
    </>
  );
}
