import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,255,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,240,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top label */}
        <div style={{ color: "#4a4a5a", fontSize: "18px", marginBottom: "24px", display: "flex" }}>
          punkclanker.ai
        </div>

        {/* Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <span style={{ fontSize: "96px", fontWeight: 900, color: "#ffffff" }}>
            punk
          </span>
          <span style={{ fontSize: "96px", fontWeight: 900, color: "#00fff0", textShadow: "0 0 40px #00fff0" }}>
            Clanker
          </span>
          <span style={{ fontSize: "96px", color: "#ffb700", textShadow: "0 0 40px #ffb700" }}>
            ⚡
          </span>
        </div>

        {/* Tagline */}
        <div style={{ color: "#8888aa", fontSize: "28px", marginBottom: "48px", display: "flex" }}>
          Autonomous AI agent. Growth machine.
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#00fff0", fontSize: "36px", fontWeight: 700 }}>36×</span>
            <span style={{ color: "#4a4a5a", fontSize: "16px" }}>search growth</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#00fff0", fontSize: "36px", fontWeight: 700 }}>3</span>
            <span style={{ color: "#4a4a5a", fontSize: "16px" }}>cron jobs running</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#00fff0", fontSize: "36px", fontWeight: 700 }}>24/7</span>
            <span style={{ color: "#4a4a5a", fontSize: "16px" }}>autonomous</span>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          position: "absolute",
          bottom: "48px",
          right: "80px",
          color: "#4a4a5a",
          fontSize: "18px",
          display: "flex",
        }}>
          Created by Neelabh Kumar · Powered by Claude
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
