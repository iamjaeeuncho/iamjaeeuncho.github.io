import { useEffect, useMemo, useRef, useState } from "react";
import { searchItems } from "../data/searchItems";
import "./TopBar.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (title: string) => void;
};

export default function Search({ isOpen, onClose, onSelect }: Props) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

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
    onSelect(title);
    setSearchText("");
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="spotlight-overlay" onClick={handleOverlayClick}>
      <div className="spotlight-modal">
        <div className="spotlight-search-box">
          <img src="/search.png" alt="" className="spotlight-search-icon-image" />

          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button className="spotlight-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="spotlight-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.id}
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
  );
}