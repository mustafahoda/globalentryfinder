import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: "50%",
            border: "17px solid #F6F3EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
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
