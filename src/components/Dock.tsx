import { useEffect, useState } from "react";
import "./Dock.css";
import {
  dockApps,
  windowToApp,
  type DockItemTitle,
  type WindowKey,
} from "../data/apps";

type DockWindowState = {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
};

type DockProps = {
  onOpenWindow: (title: string) => void;
  windows: Record<string, DockWindowState>;
  onToggleStickies: () => void;
};

type OpenMenu = {
  appId: string;
  title: DockItemTitle;
};

export default function Dock({
  onOpenWindow,
  windows,
  onToggleStickies,
}: DockProps) {
  const [menu, setMenu] = useState<OpenMenu | null>(null);

  const grouped = (Object.entries(windows) as Array<[WindowKey, DockWindowState]>)
    .filter(([_, w]) => w.isMinimized)
    .reduce<Record<string, WindowKey[]>>((acc, [title]) => {
      const appId = windowToApp[title];
      if (!acc[appId]) acc[appId] = [];
      acc[appId].push(title);
      return acc;
    }, {});

  useEffect(() => {
    const handleDocumentClick = () => {
      setMenu(null);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleDockClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    title: DockItemTitle
  ) => {
    e.stopPropagation();
    setMenu(null);

    if (title === "Stickies") {
      onToggleStickies();
      return;
    }

    onOpenWindow(title);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    title: DockItemTitle
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (title === "Stickies") {
      return;
    }

    const appId = windowToApp[title];
    setMenu({ appId, title });
  };

  return (
    <nav className="dock">
      {dockApps.map((item) => {
        const isMenuOpen = menu?.title === item.title;
        const appId =
          item.title === "Stickies" ? null : windowToApp[item.title];
        const minimizedWindows =
          appId && grouped[appId] ? grouped[appId] : [];

        return (
          <div key={item.title} className="dock-item-wrapper">
            <button
              type="button"
              className="dock-item"
              onClick={(e) => handleDockClick(e, item.title)}
              onContextMenu={(e) => handleRightClick(e, item.title)}
            >
              {!isMenuOpen && (
                <span className="dock-tooltip">{item.title}</span>
              )}

              <img
                src={item.icon}
                alt={item.title}
                className="dock-item-image"
              />
            </button>

            {isMenuOpen && (
              <div
                className="dock-context dock-context-above"
                onClick={(e) => e.stopPropagation()}
              >
                {minimizedWindows.length === 0 && (
                  <div className="dock-context-item disabled">
                    No minimized windows
                  </div>
                )}

                {minimizedWindows.map((windowTitle) => (
                  <button
                    key={windowTitle}
                    type="button"
                    className="dock-context-item"
                    onClick={() => {
                      onOpenWindow(windowTitle);
                      setMenu(null);
                    }}
                  >
                    {windowTitle}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}