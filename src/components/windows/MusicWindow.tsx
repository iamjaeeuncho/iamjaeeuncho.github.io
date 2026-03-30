import { useState } from "react";

export default function MusicWindow() {
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
          loading...
        </div>
      )}

      <iframe
        src="https://open.spotify.com/embed/track/1rEa59P5yEal5cp1h7kl2e?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
}