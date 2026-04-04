import { useEffect, useState } from "react";
import "./TopBar.css";
import Search from "./Search";

type TopBarProps = {
  onOpenWindow: (title: string) => void;
  onGoHome: () => void;
};

export default function TopBar({ onOpenWindow, onGoHome }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const handleSelectItem = (title: string) => {
    onOpenWindow(title);
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <span className="topbar-title" onClick={onGoHome}>
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

      <Search
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleSelectItem}
      />
    </>
  );
}