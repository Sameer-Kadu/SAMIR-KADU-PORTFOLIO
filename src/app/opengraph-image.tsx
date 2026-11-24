import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";
import { PROFILE } from "@/content/profile";

/**
 * Social preview card (Open Graph / Twitter), generated at build time from the
 * same content modules as the page — so it can never drift from the site.
 */
export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
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
          padding: "72px 80px",
          background: "#080a0e",
          color: "#f4f6fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "3px solid #5c98ff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SK
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8b93a3", letterSpacing: 4 }}>
            {PROFILE.availability.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
            {SITE.name}
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 40, color: "#5c98ff" }}>
            {SITE.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 980,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#b4bccb",
            }}
          >
            {SITE.shortDescription}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#8b93a3" }}>
          {PROFILE.currentRole.company} · {SITE.location}
        </div>
      </div>
    ),
    size
  );
}
