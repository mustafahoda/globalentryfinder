import { ImageResponse } from "next/og";

/**
 * A location-target glyph in the site's own accent teal, not a government seal --
 * GlobalEntryFinder isn't CBP/DHS and shouldn't visually imply it is. Sized 96x96
 * (a multiple of 48px) per Google's favicon-in-search requirements.
 */
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0088B0",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            border: "9px solid #F6F3EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#F6F3EA",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
