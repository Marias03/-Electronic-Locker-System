"use client";

interface Props {
  sucursales: any[];
  selected: any;
  onSelect: (s: any) => void;
}

export default function MapComponent({
  sucursales,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px",
      }}
    >
      {sucursales.length === 0 && (
        <div
          style={{
            fontFamily: "monospace",
            color: "gray",
            textAlign: "center",
            padding: "40px 0",
          }}
        >
          NO LOCATIONS AVAILABLE
        </div>
      )}
      {sucursales.map((s: any) => {
        const isSelected = selected?.id === s.id;
        const yandexUrl =
          "https://yandex.com/maps/?rtext=~" + s.lat + "," + s.lng;
        return (
          <div
            key={s.id}
            onClick={() => onSelect(s)}
            style={{
              border: isSelected
                ? "1px solid #00e5ff"
                : "1px solid rgba(0,229,255,0.15)",
              background: isSelected
                ? "rgba(0,229,255,0.07)"
                : "rgba(0,10,20,0.8)",
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0,
              }}
            >
              <div>📍</div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "monospace",
                    color: isSelected ? "#00e5ff" : "white",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.nombre}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    color: "gray",
                  }}
                >
                  {s.ciudad}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {isSelected && (
                <a
                  href={yandexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "8px",
                    padding: "5px 8px",
                    border: "1px solid rgba(0,229,255,0.3)",
                    color: "#00e5ff",
                    textDecoration: "none",
                  }}
                >
                  YANDEX MAPS
                </a>
              )}
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: isSelected ? "#00e5ff" : "gray",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
