import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { SITE_DATA } from "@/lib/constants";

export const runtime = "edge";
export const alt = "Ventanas BR — Ventanas de Aluminio y PVC en Coquimbo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary);
}

export default async function OpengraphImage() {
  const host = headers().get("host");
  const isLocalHost =
    host?.startsWith("localhost") || host?.startsWith("127.");
  const baseUrl = host
    ? `${isLocalHost ? "http" : "https"}://${host}`
    : SITE_DATA.url;

  const [logoResponse, regularFont, extraBoldFont] = await Promise.all([
    fetch(`${baseUrl}/images/logo-br.png`),
    fetch(`${baseUrl}/fonts/Inter-Regular.ttf`).then((response) =>
      response.arrayBuffer()
    ),
    fetch(`${baseUrl}/fonts/Inter-ExtraBold.ttf`).then((response) =>
      response.arrayBuffer()
    ),
  ]);

  if (!logoResponse.ok) {
    throw new Error("No se pudo cargar el logo para la imagen Open Graph");
  }

  const logo = `data:image/png;base64,${toBase64(
    await logoResponse.arrayBuffer()
  )}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          background: "#1B1464",
          color: "white",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            background: "rgba(0, 174, 239, 0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-240px",
            left: "-140px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background: "rgba(237, 30, 121, 0.18)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "64px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                borderRadius: "28px",
                padding: "20px 28px",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.22)",
              }}
            >
              <img
                src={logo}
                width={300}
                height={161}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
                paddingTop: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  letterSpacing: "4px",
                  color: "#00AEEF",
                }}
              >
                COQUIMBO · CHILE
              </div>
              <div
                style={{
                  fontSize: "22px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                www.ventanasbr.cl
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "68px",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
              }}
            >
              <span>Ventanas de aluminio</span>
              <span>y PVC a medida</span>
            </div>
            <div
              style={{
                fontSize: "26px",
                lineHeight: 1.35,
                color: "rgba(255, 255, 255, 0.75)",
                maxWidth: "900px",
              }}
            >
              Fabricación e instalación en Coquimbo, La Serena, Ovalle y Vicuña
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "96px",
                  height: "8px",
                  borderRadius: "9999px",
                  background: "#ED1E79",
                }}
              />
              <div
                style={{
                  display: "flex",
                  width: "56px",
                  height: "8px",
                  borderRadius: "9999px",
                  background: "#00AEEF",
                }}
              />
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                +56 9 7744 3314
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "20px",
                color: "rgba(255, 255, 255, 0.65)",
              }}
            >
              Más de 10 años de experiencia
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: "14px",
            zIndex: 20,
            background:
              "linear-gradient(90deg, #ED1E79 0%, #8A2C8F 48%, #00AEEF 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: regularFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: extraBoldFont,
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}
