function maskEmail(email: string) {
  if (!email) return "-";
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user}...@${domain}`;
  return `${user[0]}${user[1]}...${user[user.length - 1]}@${domain}`;
}

const SIZE: Record<string, string> = {
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
  ocupados: any[];
  onForceRelease: (id: number) => void;
}

export default function OccupiedTable({ ocupados, onForceRelease }: Props) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,229,255,0.12)",
        background: "rgba(2,12,24,0.7)",
        padding: "22px 24px",
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
          color: "#ff4040",
        }}
      >
        OCCUPIED UNITS
      </span>

      {ocupados.length === 0 ? (
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
          NO OCCUPIED LOCKERS
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "#",
                  "SIZE",
                  "USER",
                  "EMAIL",
                  "PIN",
                  "RESERVED AT",
                  "ACTION",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "2px",
                      color: "#4a9aba",
                      textAlign: "left",
                      padding: "8px 12px",
                      borderBottom: "1px solid rgba(0,229,255,0.1)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ocupados.map((c: any) => (
                <tr
                  key={c.id}
                  style={{ borderBottom: "1px solid rgba(0,229,255,0.05)" }}
                >
                  <td
                    style={{
                      padding: "12px",
                      color: "#e8f4ff",
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "13px",
                    }}
                  >
                    #{String(c.numero).padStart(2, "0")}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "2px",
                        color: SIZE_COLOR[c.tamanio],
                        border: `1px solid ${SIZE_COLOR[c.tamanio]}40`,
                        padding: "3px 8px",
                      }}
                    >
                      {SIZE[c.tamanio] || c.tamanio}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      color: "#c8dff5",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {c.usuario}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      color: "#4a9aba",
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "11px",
                    }}
                  >
                    {maskEmail(c.email)}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "14px",
                        letterSpacing: "6px",
                        color: "#00e5ff",
                        border: "1px solid rgba(0,229,255,0.2)",
                        padding: "4px 10px",
                      }}
                    >
                      {c.pin}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      color: "#3a6a80",
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "10px",
                    }}
                  >
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => onForceRelease(c.id)}
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "1px",
                        padding: "6px 12px",
                        background: "rgba(255,60,60,0.07)",
                        border: "1px solid rgba(255,60,60,0.3)",
                        color: "#ff4040",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        transition: "all 0.15s",
                      }}
                    >
                      FORCE RELEASE
                    </button>
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
