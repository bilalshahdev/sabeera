import { ImageResponse } from "next/og";

export const alt = "Sabeera Azmat - Junior SEO Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f3f0e8",
        color: "#1f211d",
        padding: "72px 82px",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>SA<span style={{ color: "#e96f56" }}>.</span></div>
        <div style={{ display: "flex", fontFamily: "sans-serif", fontSize: 19, letterSpacing: 3 }}>ISLAMABAD · PAKISTAN</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontFamily: "sans-serif", fontSize: 19, letterSpacing: 4, marginBottom: 25 }}>JUNIOR SEO SPECIALIST</div>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 1.02, letterSpacing: -3 }}>Search-led thinking,</div>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 1.02, letterSpacing: -3, color: "#e96f56", fontStyle: "italic" }}>human storytelling.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "sans-serif", fontSize: 20 }}>
        <span>SEO</span><span style={{ width: 7, height: 7, borderRadius: 99, background: "#e96f56" }} /><span>CONTENT</span><span style={{ width: 7, height: 7, borderRadius: 99, background: "#e96f56" }} /><span>DESIGN</span>
      </div>
    </div>,
    size,
  );
}
