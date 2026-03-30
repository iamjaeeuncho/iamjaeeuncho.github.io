import { useRef, useState } from "react";
import "./StickyNote.css";

type StickyNoteLine = {
  text: string;
  decoration?: boolean;
};

type StickyNoteProps = {
  top: number;
  left: number;
  title: string;
  lines: StickyNoteLine[];
};

export default function StickyNote({
  top,
  left,
  title,
  lines,
}: StickyNoteProps) {
  const [position, setPosition] = useState({ top, left });

  const dragData = useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragData.current.isDragging = true;
    dragData.current.offsetX = e.clientX - position.left;
    dragData.current.offsetY = e.clientY - position.top;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragData.current.isDragging) return;

    setPosition({
      left: e.clientX - dragData.current.offsetX,
      top: e.clientY - dragData.current.offsetY,
    });
  };

  const handleMouseUp = () => {
    dragData.current.isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <section
      className="sticky-note"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="sticky-note-top" onMouseDown={handleMouseDown}>
        <div className="sticky-note-header">𖤐 {title} 𖤐</div>
      </div>

      <div className="sticky-note-body">
        {lines.map((line, index) => (
          <p
            key={index}
            className={`sticky-note-line ${line.decoration ? "decoration" : ""}`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}