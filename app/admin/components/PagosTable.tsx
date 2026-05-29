"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../i18n.js";

const SIZE_LABEL: Record<string, string> = {
  pequeño: "SMALL",
  mediano: "MEDIUM",
  grande: "LARGE",
};

const SIZE_COLOR: Record<string, string> = {
  pequeño: "#00e5ff",
  mediano: "#f0a500",
  grande: "#a78bfa",
};

interface Props {
  pagos: any[];
}

const PER_PAGE = 10;

export default function PagosTable({ pagos }: Props) {
  const { t } = useTranslation("common");
  const [page, setPage] = useState(1);
  const [filtroFecha, setFiltroFecha] = useState("all");

  const total = pagos.reduce((sum: number, p: any) => sum + p.monto, 0);

  const ahora = new Date();
  const filtrados = pagos.filter((p: any) => {
    if (filtroFecha === "all") return true;
    const fecha = new Date(p.createdAt);
    const diff = ahora.getTime() - fecha.getTime();
    if (filtroFecha === "today") return diff < 86400000;
    if (filtroFecha === "week") return diff < 604800000;
    return true;
  });

  const totalPages = Math.ceil(filtrados.length / PER_PAGE);
  const paginated = filtrados.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalFiltrado = filtrados.reduce(
    (sum: number, p: any) => sum + p.monto,
    0,
  );

  const btnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "9px",
    letterSpacing: "1.5px",
    padding: "5px 12px",
    border: active ? "1px solid #00e5ff" : "1px solid rgba(0,229,255,0.2)",
    background: active ? "rgba(0,229,255,0.07)" : "transparent",
    color: active ? "#00e5ff" : "#4a9aba",
    cursor: "pointer",
    textTransform: "uppercase",
  });

  return (
    <div
      style={{
        border: "1px solid rgba(0,229,255,0.12)",
        background: "rgba(2,12,24,0.7)",
        padding: "22px 16px",
        position: "relative",
        marginBottom: "20px",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: "16px",
          transform: "translateY(-50%)",
          background: "#050b14",
          padding: "0 8px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px",
          letterSpacing: "2px",
          color: "#00e5ff",
        }}
      >
        {t("paymentLog").toUpperCase()}
      </span>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { key: "all", label: t("allTime").toUpperCase() },
            { key: "week", label: t("thisWeek").toUpperCase() },
            { key: "today", label: t("today").toUpperCase() },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFiltroFecha(f.key);
                setPage(1);
              }}
              style={btnStyle(filtroFecha === f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "9px",
              letterSpacing: "2px",
              color: "#4a9aba",
              marginBottom: "2px",
            }}
          >
            {t("totalRevenue").toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "20px",
              color: "#00e5ff",
              letterSpacing: "2px",
            }}
          >
            {totalFiltrado} RUB
          </div>
          {filtroFecha !== "all" && (
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "9px",
                color: "#3a5a70",
                marginTop: "2px",
              }}
            >
              TOTAL: {total} RUB
            </div>
          )}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#3a5a70",
            textAlign: "center",
            padding: "20px 0",
          }}
        >
          {t("noPayments").toUpperCase()}
        </div>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "500px",
              }}
            >
              <thead>
                <tr>
                  {[
                    t("locker"),
                    t("size"),
                    t("user"),
                    t("branch"),
                    t("amount"),
                    "HRS",
                    t("date"),
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "2px",
                        color: "#4a9aba",
                        textAlign: "left",
                        padding: "8px 10px",
                        borderBottom: "1px solid rgba(0,229,255,0.1)",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((p: any) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid rgba(0,229,255,0.05)" }}
                  >
                    <td
                      style={{
                        padding: "10px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "12px",
                        color: "#e8f4ff",
                      }}
                    >
                      #{String(p.numero).padStart(2, "0")}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "8px",
                          letterSpacing: "1px",
                          color: SIZE_COLOR[p.tamanio],
                          border: "1px solid " + SIZE_COLOR[p.tamanio] + "40",
                          padding: "2px 6px",
                        }}
                      >
                        {SIZE_LABEL[p.tamanio] || p.tamanio}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        color: "#c8dff5",
                        fontSize: "13px",
                        maxWidth: "80px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.usuario || "-"}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "9px",
                        color: "#4a9aba",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.sucursal?.nombre || "-"}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "13px",
                        color: "#00e5ff",
                        letterSpacing: "1px",
                      }}
                    >
                      {p.monto} RUB
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "12px",
                        color: "#4a9aba",
                      }}
                    >
                      {p.horas}h
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "9px",
                        color: "#3a6a80",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "16px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "9px",
                  color: "#3a5a70",
                  letterSpacing: "1px",
                }}
              >
                {filtrados.length} RECORDS — PAGE {page} OF {totalPages}
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    ...btnStyle(false),
                    opacity: page === 1 ? 0.3 : 1,
                    cursor: page === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  PREV
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      style={btnStyle(page === n)}
                    >
                      {n}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    ...btnStyle(false),
                    opacity: page === totalPages ? 0.3 : 1,
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
