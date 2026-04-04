import { useEffect, useRef, useState } from "react";
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
  initialWidth?: number;
  initialHeight?: number;
  isMobile?: boolean;
  isMinimized?: boolean;
};

const TOPBAR_HEIGHT = 50;
const WINDOW_MARGIN = 12;
const MIN_TOP = TOPBAR_HEIGHT + WINDOW_MARGIN;
const MIN_LEFT = 8;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 260;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
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
  initialWidth = 640,
  initialHeight = 480,
  isMobile = false,
  isMinimized = false,
}: WindowProps) {
  const [position, setPosition] = useState({
    top: Math.max(initialTop, MIN_TOP),
    left: Math.max(initialLeft, MIN_LEFT),
  });

  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
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

  useEffect(() => {
    setPosition({
      top: Math.max(initialTop, MIN_TOP),
      left: Math.max(initialLeft, MIN_LEFT),
    });
  }, [initialTop, initialLeft]);

  useEffect(() => {
    setSize({
      width: initialWidth,
      height: initialHeight,
    });
  }, [initialWidth, initialHeight]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized || isMobile) return;

    dragData.current.isDragging = true;
    dragData.current.offsetX = e.clientX - position.left;
    dragData.current.offsetY = e.clientY - position.top;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragData.current.isDragging) return;

    const rawLeft = e.clientX - dragData.current.offsetX;
    const rawTop = e.clientY - dragData.current.offsetY;

    const maxLeft = window.innerWidth - size.width - WINDOW_MARGIN;
    const maxTop = window.innerHeight - size.height - WINDOW_MARGIN;

    setPosition({
      left: clamp(rawLeft, MIN_LEFT, Math.max(MIN_LEFT, maxLeft)),
      top: clamp(rawTop, MIN_TOP, Math.max(MIN_TOP, maxTop)),
    });
  };

  const handleMouseUp = () => {
    dragData.current.isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized || isMobile) return;

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

    const maxWidth = window.innerWidth - position.left - WINDOW_MARGIN;
    const maxHeight = window.innerHeight - position.top - WINDOW_MARGIN;

    setSize({
      width: clamp(
        resizeData.current.startWidth + dx,
        MIN_WIDTH,
        Math.max(MIN_WIDTH, maxWidth)
      ),
      height: clamp(
        resizeData.current.startHeight + dy,
        MIN_HEIGHT,
        Math.max(MIN_HEIGHT, maxHeight)
      ),
    });
  };

  const handleResizeEnd = () => {
    resizeData.current.isResizing = false;
    document.removeEventListener("mousemove", handleResizing);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  return (
    <section
      className={`window ${
        isMinimized ? "window-minimized" : ""
      } ${
        isMobile ? "window-mobile" : isMaximized ? "window-maximized" : ""
      }`}
      style={{
        zIndex,
        ...(isMobile
          ? {}
          : isMaximized
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
          {!isMobile && (
            <>
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
            </>
          )}
        </div>

        <div className="window-title">{title}</div>
      </div>

      <div className="window-body">{children}</div>

      {!isMobile && !isMaximized && (
        <div className="window-resizer" onMouseDown={handleResizeStart} />
      )}
    </section>
  );
}