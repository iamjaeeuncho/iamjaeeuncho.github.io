import { useEffect, useRef, useState } from "react";
import "./DesktopIcon.css";

type DesktopIconProps = {
  title: string;
  icon: string;
  topPercent?: number;
  leftPercent?: number;
  onOpen: () => void;
  isMobile?: boolean;
  isTouch?: boolean;
};

export default function DesktopIcon({
  title,
  icon,
  topPercent = 0,
  leftPercent = 0,
  onOpen,
  isMobile = false,
  isTouch = false,
}: DesktopIconProps) {
  const getInitialPosition = () => ({
    top: (window.innerHeight - 140) * (topPercent / 100),
    left: (window.innerWidth - 92) * (leftPercent / 100),
  });

  const [position, setPosition] = useState(getInitialPosition());

  const dragData = useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    if (isTouch) return;

    const updatePosition = () => {
      setPosition(getInitialPosition());
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [topPercent, leftPercent, isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) return;

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

  if (isTouch) {
    return (
      <button
        type="button"
        className="desktop-icon desktop-icon-mobile"
        onClick={onOpen}
      >
        <div className="desktop-icon-image">
          <img src={icon} alt={title} className="desktop-icon-img" />
        </div>
        <span className="desktop-icon-title">{title}</span>
      </button>
    );
  }

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