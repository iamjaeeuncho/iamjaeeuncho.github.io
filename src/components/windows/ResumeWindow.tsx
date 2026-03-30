import { useState } from "react";

export default function ResumeWindow() {
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
        src="https://docs.google.com/document/d/1kFvOzD4wutVTf7eZYy31FwedvTFU1rUKfjqIVp5ch74/preview"
        width="100%"
        height="500"
        style={{ border: "none", borderRadius: "8px" }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}