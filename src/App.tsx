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

const DEFAULT_WINDOW_WIDTH = 640;
const DEFAULT_WINDOW_HEIGHT = 460;

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
  top: 80,
  left: 140,
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

const randomInt = (min: number, max: number) => {
  if (max <= min) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getWindowPlacementBounds = () => {
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

  return {
    width: DEFAULT_WINDOW_WIDTH,
    height: DEFAULT_WINDOW_HEIGHT,
    margin: 32,
    topMargin: 100,
  };
};

const getOverlapArea = (
  a: { top: number; left: number; width: number; height: number },
  b: { top: number; left: number; width: number; height: number }
) => {
  const overlapWidth =
    Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
  const overlapHeight =
    Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);

  if (overlapWidth <= 0 || overlapHeight <= 0) return 0;
  return overlapWidth * overlapHeight;
};

const getCenterDistance = (
  a: { top: number; left: number; width: number; height: number },
  b: { top: number; left: number; width: number; height: number }
) => {
  const ax = a.left + a.width / 2;
  const ay = a.top + a.height / 2;
  const bx = b.left + b.width / 2;
  const by = b.top + b.height / 2;

  return Math.hypot(ax - bx, ay - by);
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

  const getBestRandomWindowPosition = (
    nextWindowKey: WindowKey
  ): WindowPosition => {
    const { width, height, margin, topMargin } = getWindowPlacementBounds();

    const maxTop = Math.max(topMargin, window.innerHeight - height - margin);
    const maxLeft = Math.max(margin, window.innerWidth - width - margin);

    if (isMobile) {
      return {
        top: topMargin,
        left: margin,
      };
    }

    const openWindowKeys = (Object.keys(windows) as WindowKey[]).filter(
      (key) =>
        key !== nextWindowKey &&
        windows[key].isOpen &&
        !windows[key].isMinimized
    );

    const openRects = openWindowKeys.map((key) => {
      const pos = windowPositions[key] ?? BASE_WINDOW_POSITION;
      return {
        top: pos.top,
        left: pos.left,
        width,
        height,
      };
    });

    if (openRects.length === 0) {
      return {
        top: randomInt(topMargin, maxTop),
        left: randomInt(margin, maxLeft),
      };
    }

    const availableTopRange = Math.max(0, maxTop - topMargin);
    const availableLeftRange = Math.max(0, maxLeft - margin);

    const rowAnchors = [
      topMargin,
      topMargin + Math.round(availableTopRange / 2),
      maxTop,
    ];

    const colAnchors = [
      margin,
      margin + Math.round(availableLeftRange / 2),
      maxLeft,
    ];

    const candidates: WindowPosition[] = [];

    for (const row of rowAnchors) {
      for (const col of colAnchors) {
        candidates.push({
          top: clamp(row + randomInt(-40, 40), topMargin, maxTop),
          left: clamp(col + randomInt(-70, 70), margin, maxLeft),
        });
      }
    }

    for (let i = 0; i < 40; i++) {
      candidates.push({
        top: randomInt(topMargin, maxTop),
        left: randomInt(margin, maxLeft),
      });
    }

    let bestCandidate = candidates[0] ?? {
      top: randomInt(topMargin, maxTop),
      left: randomInt(margin, maxLeft),
    };

    let bestScore = -Infinity;

    for (const candidate of candidates) {
      const candidateRect = {
        top: candidate.top,
        left: candidate.left,
        width,
        height,
      };

      let overlapAreaSum = 0;
      let minDistance = Infinity;
      let topDifferenceSum = 0;

      for (const rect of openRects) {
        overlapAreaSum += getOverlapArea(candidateRect, rect);
        minDistance = Math.min(
          minDistance,
          getCenterDistance(candidateRect, rect)
        );
        topDifferenceSum += Math.abs(candidate.top - rect.top);
      }

      const overlapRatio = overlapAreaSum / (width * height);
      const avgTopDifference =
        openRects.length > 0 ? topDifferenceSum / openRects.length : 0;
      const distanceBonus = Number.isFinite(minDistance) ? minDistance : 0;

      const score =
        avgTopDifference * 12 +
        distanceBonus * 0.35 -
        overlapRatio * 10000;

      if (score > bestScore) {
        bestScore = score;
        bestCandidate = candidate;
      }
    }

    return bestCandidate;
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

    const randomInt = (min: number, max: number) => {
      if (max <= min) return min;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    if (!windowPositions[windowKey]) {
      const margin = 32;
      const topMargin = 100;
      const windowWidth = 640;
      const windowHeight = 460;

      const maxTop = Math.max(topMargin, window.innerHeight - windowHeight - margin);
      const maxLeft = Math.max(margin, window.innerWidth - windowWidth - margin);

      const existingPositions = Object.values(windowPositions);

      const lastPosition =
        existingPositions.length > 0
          ? existingPositions[existingPositions.length - 1]
          : BASE_WINDOW_POSITION;

      const nextTop = clamp(
        lastPosition.top + randomInt(20, 40),
        topMargin,
        maxTop
      );

      const nextLeft = clamp(
        lastPosition.left + (Math.random() < 0.5 ? -1 : 1) * randomInt(20, 40),
        margin,
        maxLeft
      );

      setWindowPositions((prev) => ({
        ...prev,
        [windowKey]: {
          top: nextTop,
          left: nextLeft,
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