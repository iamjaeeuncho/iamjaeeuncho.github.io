import { useRef, useState } from "react";
import "./StickyNote.css";

type StickyNoteItem = {
  label: string;
  value: string;
};

type StickyNoteProps = {
  top: number;
  left: number;
  title: string;
  items: StickyNoteItem[];
};

export default function StickyNote({
  top,
  left,
  title,
  items,
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
        <img
          src="/icons/Stickies.png"
          alt="Stickies"
          className="sticky-note-icon"
        />
        <div className="sticky-note-header">{title}</div>
      </div>

      <div className="sticky-note-body">
        {items.map((item) => (
          <div key={item.label} className="sticky-note-row">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}