"use client";
import { useTranslation } from "react-i18next";
import "../../../i18n";

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

function maskEmail(email: string) {
  if (!email) return "-";
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user}...@${domain}`;
  return `${user[0]}${user[1]}...${user[user.length - 1]}@${domain}`;
}

interface Props {
  pagos: any[];
}

export default function PagosTable({ pagos }: Props) {
  const { t } = useTranslation("common");
  const total = pagos.reduce((sum: number, p: any) => sum + p.monto, 0);

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
          justifyContent: "flex-end",
          marginBottom: "12px",
        }}
      >
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
            ₽{total}
          </div>
        </div>
      </div>

      {pagos.length === 0 ? (
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
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "400px",
            }}
          >
            <thead>
              <tr>
                {[
                  t("locker"),
                  t("size"),
                  t("user"),
                  t("amount"),
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
              {pagos.map((p: any) => (
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
                        border: `1px solid ${SIZE_COLOR[p.tamanio]}40`,
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
                      fontSize: "13px",
                      color: "#00e5ff",
                      letterSpacing: "1px",
                    }}
                  >
                    ₽{p.monto}
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
      )}
    </div>
  );
}
