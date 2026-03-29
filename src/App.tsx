import { useState } from "react";
import TopBar from "./components/TopBar";
import DesktopIcon from "./components/DesktopIcon";
import StickyNote from "./components/StickyNote";
import Window from "./components/Window";
import Dock from "./components/Dock";
import { desktopApps, type WindowKey } from "./data/apps";

type WindowState = {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
};

type WindowStates = Record<WindowKey, WindowState>;

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

function App() {
  const [windows, setWindows] = useState<WindowStates>(initialWindowStates);
  const [showStickies, setShowStickies] = useState(true);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const [_topZ, setTopZ] = useState(1);

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

    setWindows((prev) => ({
      ...prev,
      [title as WindowKey]: {
        ...prev[title as WindowKey],
        isOpen: true,
        isMinimized: false,
      },
    }));

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

  return (
    <div className="desktop">
      <TopBar onOpenWindow={handleOpenWindow} />

      <main className="desktop-main">
        {showStickies && (
          <StickyNote
            top={100}
            left={75}
            title="Stats"
            items={[
              { label: "Projects", value: "3" },
              { label: "Essays", value: "3" },
              { label: "Resume", value: "1" },
            ]}
          />
        )}

        {desktopApps
          .filter((app) => app.showOnDesktop)
          .map((app) => (
            <DesktopIcon
              key={app.title}
              title={app.title}
              icon={app.icon}
              top={app.top}
              left={app.left}
              right={app.right}
              onOpen={() => handleOpenWindow(app.title)}
            />
          ))}

        {windows["Finder"].isOpen && !windows["Finder"].isMinimized && (
          <Window
            title="Finder"
            initialTop={70}
            initialLeft={180}
            isMaximized={windows["Finder"].isMaximized}
            zIndex={zMap["Finder"] ?? 1}
            onFocus={() => bringToFront("Finder")}
            onClose={() => handleCloseWindow("Finder")}
            onMinimize={() => handleMinimizeWindow("Finder")}
            onToggleMaximize={() => handleToggleMaximize("Finder")}
          >
            <div className="window-content">
              <h2>Finder</h2>
              <ul className="finder-list">
                <li onDoubleClick={() => handleOpenWindow("About Me")}>📁 About Me</li>
                <li onDoubleClick={() => handleOpenWindow("Projects")}>📁 Projects</li>
                <li onDoubleClick={() => handleOpenWindow("Blog")}>📁 Blog</li>
                <li onDoubleClick={() => handleOpenWindow("Resume.pdf")}>📄 Resume.pdf</li>
                <li onDoubleClick={() => handleOpenWindow("Trash")}>🗑 Trash</li>
              </ul>
            </div>
          </Window>
        )}

        {windows["Contracts"].isOpen && !windows["Contracts"].isMinimized && (
          <Window
            title="Contracts"
            initialTop={90}
            initialLeft={230}
            isMaximized={windows["Contracts"].isMaximized}
            zIndex={zMap["Contracts"] ?? 1}
            onFocus={() => bringToFront("Contracts")}
            onClose={() => handleCloseWindow("Contracts")}
            onMinimize={() => handleMinimizeWindow("Contracts")}
            onToggleMaximize={() => handleToggleMaximize("Contracts")}
          >
            <div className="window-content">
              <h2>Contracts</h2>
              <p>계약서나 관련 문서를 여기에 넣으면 됩니다.</p>
            </div>
          </Window>
        )}

        {windows["Messages"].isOpen && !windows["Messages"].isMinimized && (
          <Window
            title="Messages"
            initialTop={120}
            initialLeft={260}
            isMaximized={windows["Messages"].isMaximized}
            zIndex={zMap["Messages"] ?? 1}
            onFocus={() => bringToFront("Messages")}
            onClose={() => handleCloseWindow("Messages")}
            onMinimize={() => handleMinimizeWindow("Messages")}
            onToggleMaximize={() => handleToggleMaximize("Messages")}
          >
            <div className="window-content">
              <h2>Messages</h2>
              <p>Q&amp;A 창으로 사용할 수 있어요.</p>
            </div>
          </Window>
        )}

        {windows["Photos"].isOpen && !windows["Photos"].isMinimized && (
          <Window
            title="Photos"
            initialTop={150}
            initialLeft={300}
            isMaximized={windows["Photos"].isMaximized}
            zIndex={zMap["Photos"] ?? 1}
            onFocus={() => bringToFront("Photos")}
            onClose={() => handleCloseWindow("Photos")}
            onMinimize={() => handleMinimizeWindow("Photos")}
            onToggleMaximize={() => handleToggleMaximize("Photos")}
          >
            <div className="window-content">
              <h2>Photos</h2>
              <p>갤러리 창입니다. 나중에 이미지 그리드로 바꿀 수 있어요.</p>
            </div>
          </Window>
        )}

        {windows["Notes"].isOpen && !windows["Notes"].isMinimized && (
          <Window
            title="Notes"
            initialTop={180}
            initialLeft={340}
            isMaximized={windows["Notes"].isMaximized}
            zIndex={zMap["Notes"] ?? 1}
            onFocus={() => bringToFront("Notes")}
            onClose={() => handleCloseWindow("Notes")}
            onMinimize={() => handleMinimizeWindow("Notes")}
            onToggleMaximize={() => handleToggleMaximize("Notes")}
          >
            <div className="window-content">
              <h2>Notes</h2>
              <p>노트만 모아 보여주는 창입니다.</p>
            </div>
          </Window>
        )}

        {windows["Documents"].isOpen && !windows["Documents"].isMinimized && (
          <Window
            title="Documents"
            initialTop={100}
            initialLeft={380}
            isMaximized={windows["Documents"].isMaximized}
            zIndex={zMap["Documents"] ?? 1}
            onFocus={() => bringToFront("Documents")}
            onClose={() => handleCloseWindow("Documents")}
            onMinimize={() => handleMinimizeWindow("Documents")}
            onToggleMaximize={() => handleToggleMaximize("Documents")}
          >
            <div className="window-content">
              <h2>Documents</h2>
              <ul className="folder-list">
                <li>Resume.pdf</li>
              </ul>
            </div>
          </Window>
        )}

        {windows["Music"].isOpen && !windows["Music"].isMinimized && (
          <Window
            title="Music"
            initialTop={130}
            initialLeft={420}
            isMaximized={windows["Music"].isMaximized}
            zIndex={zMap["Music"] ?? 1}
            onFocus={() => bringToFront("Music")}
            onClose={() => handleCloseWindow("Music")}
            onMinimize={() => handleMinimizeWindow("Music")}
            onToggleMaximize={() => handleToggleMaximize("Music")}
          >
            <div className="window-content">
              <h2>Music</h2>
              <p>좋아하는 플레이리스트나 음악 링크를 넣을 수 있어요.</p>
            </div>
          </Window>
        )}

        {windows["About Me"].isOpen && !windows["About Me"].isMinimized && (
          <Window
            title="About Me"
            initialTop={90}
            initialLeft={220}
            isMaximized={windows["About Me"].isMaximized}
            zIndex={zMap["About Me"] ?? 1}
            onFocus={() => bringToFront("About Me")}
            onClose={() => handleCloseWindow("About Me")}
            onMinimize={() => handleMinimizeWindow("About Me")}
            onToggleMaximize={() => handleToggleMaximize("About Me")}
          >
            <div className="window-content">
              <h2>About Me</h2>
              <p>여기에 자기소개 내용을 넣으면 됩니다.</p>
            </div>
          </Window>
        )}

        {windows["Projects"].isOpen && !windows["Projects"].isMinimized && (
          <Window
            title="Projects"
            initialTop={120}
            initialLeft={260}
            isMaximized={windows["Projects"].isMaximized}
            zIndex={zMap["Projects"] ?? 1}
            onFocus={() => bringToFront("Projects")}
            onClose={() => handleCloseWindow("Projects")}
            onMinimize={() => handleMinimizeWindow("Projects")}
            onToggleMaximize={() => handleToggleMaximize("Projects")}
          >
            <div className="window-content">
              <h2>Projects</h2>
              <ul className="folder-list">
                <li>Project 1</li>
                <li>Project 2</li>
                <li>Project 3</li>
              </ul>
            </div>
          </Window>
        )}

        {windows["Blog"].isOpen && !windows["Blog"].isMinimized && (
          <Window
            title="Blog"
            initialTop={150}
            initialLeft={300}
            isMaximized={windows["Blog"].isMaximized}
            zIndex={zMap["Blog"] ?? 1}
            onFocus={() => bringToFront("Blog")}
            onClose={() => handleCloseWindow("Blog")}
            onMinimize={() => handleMinimizeWindow("Blog")}
            onToggleMaximize={() => handleToggleMaximize("Blog")}
          >
            <div className="window-content">
              <h2>Blog</h2>
              <ul className="folder-list">
                <li>Essay 1</li>
                <li>Essay 2</li>
                <li>Essay 3</li>
              </ul>
            </div>
          </Window>
        )}

        {windows["Resume.pdf"].isOpen &&
          !windows["Resume.pdf"].isMinimized && (
            <Window
              title="Resume.pdf"
              initialTop={100}
              initialLeft={340}
              isMaximized={windows["Resume.pdf"].isMaximized}
              zIndex={zMap["Resume.pdf"] ?? 1}
              onFocus={() => bringToFront("Resume.pdf")}
              onClose={() => handleCloseWindow("Resume.pdf")}
              onMinimize={() => handleMinimizeWindow("Resume.pdf")}
              onToggleMaximize={() => handleToggleMaximize("Resume.pdf")}
            >
              <div className="window-content">
                <h2>Resume</h2>
                <p>여기에 이력서 요약이나 PDF 링크를 넣으면 됩니다.</p>
              </div>
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