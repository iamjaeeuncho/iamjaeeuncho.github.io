import { useRef, useState } from "react";
import "./DesktopIcon.css";

type DesktopIconProps = {
  title: string;
  icon: string;
  top?: number;
  left?: number;
  right?: number;
  onOpen: () => void;
};

export default function DesktopIcon({
  title,
  icon,
  top = 0,
  left,
  right,
  onOpen,
}: DesktopIconProps) {
  const initialLeft = left ?? window.innerWidth - (right ?? 0) - 92;

  const [position, setPosition] = useState({
    top,
    left: initialLeft,
  });

  const dragData = useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <button
      type="button"
      className="desktop-icon"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onOpen}
    >
      <div className="desktop-icon-image">
        <img src={icon} alt={title} className="desktop-icon-img" />
      </div>
      <span className="desktop-icon-title">{title}</span>
    </button>
  );
}