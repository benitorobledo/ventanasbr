import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ventanas BR — Ventanas de Aluminio y PVC en Coquimbo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B1464",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "9999px",
              background: "#00AEEF",
            }}
          />
          <div style={{ fontSize: "52px", fontWeight: 800, letterSpacing: "2px" }}>
            VENTANAS BR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.1 }}>
            Ventanas de Aluminio y PVC en Coquimbo
          </div>
          <div style={{ fontSize: "34px", color: "#00AEEF" }}>
            ventanasbr.cl
          </div>
        </div>

        <div style={{ display: "flex", width: "240px", height: "12px", background: "#ED1E79" }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
