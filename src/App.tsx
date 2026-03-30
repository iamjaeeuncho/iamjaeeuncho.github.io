import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import DesktopIcon from "./components/DesktopIcon";
import StickyNote from "./components/StickyNote";
import Window from "./components/Window";
import Dock from "./components/Dock";
import { desktopApps, type WindowKey } from "./data/apps";

import FinderWindow from "./components/windows/FinderWindow";
import ContractsWindow from "./components/windows/ContractsWindow";
import MessagesWindow from "./components/windows/MessagesWindow";
import PhotosWindow from "./components/windows/PhotosWindow";
import MusicWindow from "./components/windows/MusicWindow";
import TrashWindow from "./components/windows/TrashWindow";
import AboutMeWindow from "./components/windows/AboutMeWindow";
import ProjectsWindow from "./components/windows/ProjectsWindow";
import BlogWindow from "./components/windows/BlogWindow";
import ResumeWindow from "./components/windows/ResumeWindow";

type WindowState = {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
};

type WindowStates = Record<WindowKey, WindowState>;

type WindowPosition = {
  top: number;
  left: number;
};

const initialWindowStates: WindowStates = {
  Finder: { isOpen: false, isMinimized: false, isMaximized: false },
  Contracts: { isOpen: false, isMinimized: false, isMaximized: false },
  Messages: { isOpen: false, isMinimized: false, isMaximized: false },
  Photos: { isOpen: false, isMinimized: false, isMaximized: false },
  Notes: { isOpen: false, isMinimized: false, isMaximized: false },
  Documents: { isOpen: false, isMinimized: false, isMaximized: false },
  Music: { isOpen: false, isMinimized: false, isMaximized: false },
  Trash: { isOpen: false, isMinimized: false, isMaximized: false },
  "About Me": { isOpen: false, isMinimized: false, isMaximized: false },
  Projects: { isOpen: false, isMinimized: false, isMaximized: false },
  Blog: { isOpen: false, isMinimized: false, isMaximized: false },
  "Resume.pdf": { isOpen: false, isMinimized: false, isMaximized: false },
};

const BASE_WINDOW_POSITION: WindowPosition = {
  top: 120,
  left: 220,
};

function useIsMobile(breakpoint = 1200) {
  const [isMobile, setIsMobile] = useState(() =>
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

function useIsTouch(breakpoint = 1200) {
  const [isTouch, setIsTouch] = useState(() =>
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTouch(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isTouch;
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const getViewportWindowSize = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw <= 768) {
    return {
      width: vw - 24,
      height: vh - 100,
      margin: 12,
      topMargin: 60,
    };
  }

  if (vw <= 1200) {
    return {
      width: Math.min(840, vw - 48),
      height: Math.min(760, vh - 80),
      margin: 24,
      topMargin: 70,
    };
  }

  return {
    width: Math.min(900, vw - 80),
    height: Math.min(760, vh - 80),
    margin: 32,
    topMargin: 100,
  };
};

function App() {
  const [windows, setWindows] = useState<WindowStates>(initialWindowStates);
  const [showStickies, setShowStickies] = useState(true);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const [_topZ, setTopZ] = useState(1);

  const [windowPositions, setWindowPositions] = useState<
    Partial<Record<WindowKey, WindowPosition>>
  >({});

  const isMobile = useIsMobile();
  const isTouch = useIsTouch();

  const bringToFront = (title: string) => {
    setTopZ((prev) => {
      const nextZ = prev + 1;
      setZMap((prevMap) => ({
        ...prevMap,
        [title]: nextZ,
      }));
      return nextZ;
    });
  };

  const handleOpenWindow = (title: string) => {
    if (!(title in windows)) return;

    const windowKey = title as WindowKey;

    setWindows((prev) => ({
      ...prev,
      [windowKey]: {
        ...prev[windowKey],
        isOpen: true,
        isMinimized: false,
        isMaximized: isMobile,
      },
    }));

    if (!windowPositions[windowKey]) {
      const { width, height, margin, topMargin } = getViewportWindowSize();

      const openWindowCount = Object.keys(windowPositions).length;
      const cascadeIndex = (openWindowCount + 1) % 6;

      const CASCADE_X = isMobile ? 0 : 44;
      const CASCADE_Y = isMobile ? 0 : 30;
      const ROW_DROP = isMobile ? 0 : 18;

      const zigzagOffsetX =
        cascadeIndex === 0
          ? 0
          : cascadeIndex % 2 === 1
            ? -Math.ceil(cascadeIndex / 2) * CASCADE_X
            : (cascadeIndex / 2) * CASCADE_X;

      const zigzagOffsetY =
        cascadeIndex === 0
          ? 0
          : cascadeIndex === 1
            ? CASCADE_Y
            : cascadeIndex === 2
              ? CASCADE_Y * 2
              : cascadeIndex === 3
                ? CASCADE_Y * 2 + ROW_DROP
                : cascadeIndex === 4
                  ? CASCADE_Y * 3 + ROW_DROP
                  : CASCADE_Y * 4 + ROW_DROP;

      const rawTop = BASE_WINDOW_POSITION.top + zigzagOffsetY;
      const rawLeft = BASE_WINDOW_POSITION.left + zigzagOffsetX;

      const maxTop = Math.max(topMargin, window.innerHeight - height - margin);
      const maxLeft = Math.max(margin, window.innerWidth - width - margin);

      const safeTop = clamp(rawTop, topMargin, maxTop);
      const safeLeft = clamp(rawLeft, margin, maxLeft);

      setWindowPositions((prev) => ({
        ...prev,
        [windowKey]: {
          top: safeTop,
          left: safeLeft,
        },
      }));
    }

    bringToFront(title);
  };

  const handleCloseWindow = (title: WindowKey) => {
    setWindows((prev) => ({
      ...prev,
      [title]: {
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
  };

  const handleMinimizeWindow = (title: WindowKey) => {
    setWindows((prev) => ({
      ...prev,
      [title]: {
        ...prev[title],
        isMinimized: true,
        isOpen: false,
      },
    }));
  };

  const handleToggleMaximize = (title: WindowKey) => {
    setWindows((prev) => ({
      ...prev,
      [title]: {
        ...prev[title],
        isMaximized: !prev[title].isMaximized,
      },
    }));

    bringToFront(title);
  };

  const toggleStickies = () => {
    setShowStickies((prev) => !prev);
  };

  const getWindowPosition = (title: WindowKey) => {
    return windowPositions[title] ?? BASE_WINDOW_POSITION;
  };

  const handleGoHome = () => {
    setWindows(initialWindowStates);
    setWindowPositions({});
  };

  return (
    <div className="desktop">
      <TopBar onOpenWindow={handleOpenWindow} onGoHome={handleGoHome} />

      <main className="desktop-main">
        {!isMobile && showStickies && (
          <StickyNote
            top={100}
            left={75}
            title="To Do List"
            items={[
              { label: "Projects", value: "3" },
              { label: "Essays", value: "3" },
              { label: "Resume", value: "1" },
            ]}
          />
        )}

        {!isMobile ? (
          desktopApps
            .filter((app) => app.showOnDesktop)
            .map((app) => (
              <DesktopIcon
                key={app.title}
                title={app.title}
                icon={app.icon}
                topPercent={app.topPercent}
                leftPercent={app.leftPercent}
                onOpen={() => handleOpenWindow(app.title)}
                isMobile={false}
                isTouch={isTouch}
              />
            ))
        ) : (
          <div className="mobile-icon-grid">
            {desktopApps
              .filter((app) => app.showOnDesktop)
              .map((app) => (
                <DesktopIcon
                  key={app.title}
                  title={app.title}
                  icon={app.icon}
                  onOpen={() => handleOpenWindow(app.title)}
                  isMobile
                  isTouch={isTouch}
                />
              ))}
          </div>
        )}

        {windows["Finder"].isOpen && (
          <Window
            title="Finder"
            initialTop={getWindowPosition("Finder").top}
            initialLeft={getWindowPosition("Finder").left}
            isMaximized={windows["Finder"].isMaximized}
            zIndex={zMap["Finder"] ?? 1}
            onFocus={() => bringToFront("Finder")}
            onClose={() => handleCloseWindow("Finder")}
            onMinimize={() => handleMinimizeWindow("Finder")}
            onToggleMaximize={() => handleToggleMaximize("Finder")}
            isMobile={isMobile}
            isMinimized={windows["Finder"].isMinimized}
          >
            <FinderWindow onOpenWindow={handleOpenWindow} />
          </Window>
        )}

        {windows["Contracts"].isOpen && (
          <Window
            title="Contracts"
            initialTop={getWindowPosition("Contracts").top}
            initialLeft={getWindowPosition("Contracts").left}
            isMaximized={windows["Contracts"].isMaximized}
            zIndex={zMap["Contracts"] ?? 1}
            onFocus={() => bringToFront("Contracts")}
            onClose={() => handleCloseWindow("Contracts")}
            onMinimize={() => handleMinimizeWindow("Contracts")}
            onToggleMaximize={() => handleToggleMaximize("Contracts")}
            isMobile={isMobile}
            isMinimized={windows["Contracts"].isMinimized}
          >
            <ContractsWindow />
          </Window>
        )}

        {windows["Messages"].isOpen && (
          <Window
            title="Messages"
            initialTop={getWindowPosition("Messages").top}
            initialLeft={getWindowPosition("Messages").left}
            isMaximized={windows["Messages"].isMaximized}
            zIndex={zMap["Messages"] ?? 1}
            onFocus={() => bringToFront("Messages")}
            onClose={() => handleCloseWindow("Messages")}
            onMinimize={() => handleMinimizeWindow("Messages")}
            onToggleMaximize={() => handleToggleMaximize("Messages")}
            isMobile={isMobile}
            isMinimized={windows["Messages"].isMinimized}
          >
            <MessagesWindow />
          </Window>
        )}

        {windows["Photos"].isOpen && (
          <Window
            title="Photos"
            initialTop={getWindowPosition("Photos").top}
            initialLeft={getWindowPosition("Photos").left}
            isMaximized={windows["Photos"].isMaximized}
            zIndex={zMap["Photos"] ?? 1}
            onFocus={() => bringToFront("Photos")}
            onClose={() => handleCloseWindow("Photos")}
            onMinimize={() => handleMinimizeWindow("Photos")}
            onToggleMaximize={() => handleToggleMaximize("Photos")}
            isMobile={isMobile}
            isMinimized={windows["Photos"].isMinimized}
          >
            <PhotosWindow />
          </Window>
        )}

        {windows["Music"].isOpen && (
          <Window
            title="Music"
            initialTop={getWindowPosition("Music").top}
            initialLeft={getWindowPosition("Music").left}
            isMaximized={windows["Music"].isMaximized}
            zIndex={zMap["Music"] ?? 1}
            onFocus={() => bringToFront("Music")}
            onClose={() => handleCloseWindow("Music")}
            onMinimize={() => handleMinimizeWindow("Music")}
            onToggleMaximize={() => handleToggleMaximize("Music")}
            isMobile={isMobile}
            isMinimized={windows["Music"].isMinimized}
          >
            <MusicWindow />
          </Window>
        )}

        {windows["Trash"].isOpen && (
          <Window
            title="Trash"
            initialTop={getWindowPosition("Trash").top}
            initialLeft={getWindowPosition("Trash").left}
            isMaximized={windows["Trash"].isMaximized}
            zIndex={zMap["Trash"] ?? 1}
            onFocus={() => bringToFront("Trash")}
            onClose={() => handleCloseWindow("Trash")}
            onMinimize={() => handleMinimizeWindow("Trash")}
            onToggleMaximize={() => handleToggleMaximize("Trash")}
            isMobile={isMobile}
            isMinimized={windows["Trash"].isMinimized}
          >
            <TrashWindow />
          </Window>
        )}

        {windows["About Me"].isOpen && (
          <Window
            title="About Me"
            initialTop={getWindowPosition("About Me").top}
            initialLeft={getWindowPosition("About Me").left}
            isMaximized={windows["About Me"].isMaximized}
            zIndex={zMap["About Me"] ?? 1}
            onFocus={() => bringToFront("About Me")}
            onClose={() => handleCloseWindow("About Me")}
            onMinimize={() => handleMinimizeWindow("About Me")}
            onToggleMaximize={() => handleToggleMaximize("About Me")}
            isMobile={isMobile}
            isMinimized={windows["About Me"].isMinimized}
          >
            <AboutMeWindow />
          </Window>
        )}

        {windows["Projects"].isOpen && (
          <Window
            title="Projects"
            initialTop={getWindowPosition("Projects").top}
            initialLeft={getWindowPosition("Projects").left}
            isMaximized={windows["Projects"].isMaximized}
            zIndex={zMap["Projects"] ?? 1}
            onFocus={() => bringToFront("Projects")}
            onClose={() => handleCloseWindow("Projects")}
            onMinimize={() => handleMinimizeWindow("Projects")}
            onToggleMaximize={() => handleToggleMaximize("Projects")}
            isMobile={isMobile}
            isMinimized={windows["Projects"].isMinimized}
          >
            <ProjectsWindow />
          </Window>
        )}

        {windows["Blog"].isOpen && (
          <Window
            title="Blog"
            initialTop={getWindowPosition("Blog").top}
            initialLeft={getWindowPosition("Blog").left}
            isMaximized={windows["Blog"].isMaximized}
            zIndex={zMap["Blog"] ?? 1}
            onFocus={() => bringToFront("Blog")}
            onClose={() => handleCloseWindow("Blog")}
            onMinimize={() => handleMinimizeWindow("Blog")}
            onToggleMaximize={() => handleToggleMaximize("Blog")}
            isMobile={isMobile}
            isMinimized={windows["Blog"].isMinimized}
          >
            <BlogWindow />
          </Window>
        )}

        {windows["Resume.pdf"].isOpen && (
          <Window
            title="Resume.pdf"
            initialTop={getWindowPosition("Resume.pdf").top}
            initialLeft={getWindowPosition("Resume.pdf").left}
            isMaximized={windows["Resume.pdf"].isMaximized}
            zIndex={zMap["Resume.pdf"] ?? 1}
            onFocus={() => bringToFront("Resume.pdf")}
            onClose={() => handleCloseWindow("Resume.pdf")}
            onMinimize={() => handleMinimizeWindow("Resume.pdf")}
            onToggleMaximize={() => handleToggleMaximize("Resume.pdf")}
            isMobile={isMobile}
            isMinimized={windows["Resume.pdf"].isMinimized}
          >
            <ResumeWindow />
          </Window>
        )}
      </main>

      <Dock
        onOpenWindow={handleOpenWindow}
        windows={windows}
        onToggleStickies={toggleStickies}
      />
    </div>
  );
}

export default App;