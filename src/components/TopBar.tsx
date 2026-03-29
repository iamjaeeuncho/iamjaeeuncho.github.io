import { useEffect, useMemo, useRef, useState } from "react";
import "./TopBar.css";

type SearchItem = {
  id: number;
  title: string;
  type: string;
  description: string;
};

type TopBarProps = {
  onOpenWindow: (title: string) => void;
  onGoHome: () => void;
};

const searchItems: SearchItem[] = [
  { id: 1, title: "Finder", type: "App", description: "View all files" },
  { id: 2, title: "Contracts", type: "App", description: "Open contracts" },
  { id: 3, title: "Messages", type: "App", description: "Open Q&A window" },
  { id: 4, title: "Photos", type: "App", description: "Open gallery window" },
  { id: 5, title: "Notes", type: "App", description: "Open notes" },
  { id: 6, title: "Documents", type: "App", description: "View documents" },
  { id: 7, title: "Music", type: "App", description: "Open music window" },
  { id: 8, title: "Trash", type: "Folder", description: "Open trash" },
  { id: 9, title: "About Me", type: "Folder", description: "About me folder" },
  { id: 10, title: "Projects", type: "Folder", description: "Projects folder" },
  { id: 11, title: "Blog", type: "Folder", description: "Blog folder" },
  { id: 12, title: "Resume.pdf", type: "File", description: "Open resume" },
];

export default function TopBar({ onOpenWindow, onGoHome }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(formatted.replace(/,/g, ""));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return searchItems;

    return searchItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
      );
    });
  }, [searchText]);

  const handleItemClick = (title: string) => {
    onOpenWindow(title);
    setIsSearchOpen(false);
    setSearchText("");
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <span
            className="topbar-title"
            onClick={onGoHome}
          >
            iamjaeeuncho
          </span>
        </div>

        <div className="topbar-right">
          <button
            type="button"
            className="search-trigger"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open spotlight search"
          >
            <img src="/search.png" alt="search" className="search-icon-image" />
          </button>

          <span className="topbar-time">{currentTime}</span>
        </div>
      </header>

      {isSearchOpen && (
        <div className="spotlight-overlay" onClick={handleOverlayClick}>
          <div className="spotlight-modal">
            <div className="spotlight-search-box">
              <img
                src="/search.png"
                alt=""
                className="spotlight-search-icon-image"
              />

              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <button
                type="button"
                className="spotlight-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close spotlight search"
              >
                ×
              </button>
            </div>

            <div className="spotlight-results">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="spotlight-result-item"
                    onClick={() => handleItemClick(item.title)}
                  >
                    <div className="spotlight-result-icon">
                      {item.type === "File" ? "📄" : "📁"}
                    </div>

                    <div className="spotlight-result-text">
                      <div className="spotlight-result-title">{item.title}</div>
                      <div className="spotlight-result-description">
                        {item.description}
                      </div>
                    </div>

                    <div className="spotlight-result-type">{item.type}</div>
                  </button>
                ))
              ) : (
                <div className="spotlight-empty">No results found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}