import { useRef, useState } from "react";
import "./Window.css";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  isMaximized: boolean;
  zIndex: number;
  onFocus: () => void;
  initialTop?: number;
  initialLeft?: number;
};

export default function Window({
  title,
  children,
  onClose,
  onMinimize,
  onToggleMaximize,
  isMaximized,
  zIndex,
  onFocus,
  initialTop = 100,
  initialLeft = 220,
}: WindowProps) {
  const [position, setPosition] = useState({
    top: initialTop,
    left: initialLeft,
  });

  const [size, setSize] = useState({
    width: 560,
    height: 360,
  });

  const dragData = useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const resizeData = useRef({
    isResizing: false,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;

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

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;

    e.stopPropagation();

    resizeData.current.isResizing = true;
    resizeData.current.startX = e.clientX;
    resizeData.current.startY = e.clientY;
    resizeData.current.startWidth = size.width;
    resizeData.current.startHeight = size.height;

    document.addEventListener("mousemove", handleResizing);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizing = (e: MouseEvent) => {
    if (!resizeData.current.isResizing) return;

    const dx = e.clientX - resizeData.current.startX;
    const dy = e.clientY - resizeData.current.startY;

    setSize({
      width: Math.max(400, resizeData.current.startWidth + dx),
      height: Math.max(260, resizeData.current.startHeight + dy),
    });
  };

  const handleResizeEnd = () => {
    resizeData.current.isResizing = false;
    document.removeEventListener("mousemove", handleResizing);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  return (
    <section
      className={`window ${isMaximized ? "window-maximized" : ""}`}
      style={{
        zIndex,
        ...(isMaximized
          ? {}
          : {
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
            }),
      }}
      onMouseDown={onFocus}
    >
      <div className="window-header" onMouseDown={handleMouseDown}>
        <div className="window-controls">
          <button
            type="button"
            className="window-control close"
            onClick={onClose}
            aria-label="Close window"
          />
          <button
            type="button"
            className="window-control minimize"
            onClick={onMinimize}
            aria-label="Minimize window"
          />
          <button
            type="button"
            className="window-control maximize"
            onClick={onToggleMaximize}
            aria-label="Maximize window"
          />
        </div>

        <div className="window-title">{title}</div>
      </div>

      <div className="window-body">{children}</div>

      {!isMaximized && (
        <div className="window-resizer" onMouseDown={handleResizeStart} />
      )}
    </section>
  );
}