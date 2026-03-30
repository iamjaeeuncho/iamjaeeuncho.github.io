import { useState } from "react";

export default function PhotosWindow() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="window-content" style={{ position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111",
            fontSize: "14px",
            zIndex: 1,
          }}
        >
          Loading...
        </div>
      )}

      <iframe
        src="https://jenonearth.myportfolio.com/"
        width="100%"
        height="600"
        style={{ border: "none", borderRadius: "8px" }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}