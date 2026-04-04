import { useMemo, useState } from "react";
import { searchItems } from "../../data/searchItems";
import "./FinderWindow.css";

type FinderWindowProps = {
  onOpenWindow: (title: string) => void;
};

export default function FinderWindow({ onOpenWindow }: FinderWindowProps) {
  const [searchText, setSearchText] = useState("");

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

  const handleOpenItem = (title: string) => {
    onOpenWindow(title);
  };

  return (
    <div className="finder-window">
      <div className="finder-toolbar">
        <input
          type="text"
          placeholder="Search files, folders..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="finder-search-input"
        />
      </div>

      <div className="finder-content">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <button
              key={item.id}
              className="finder-item"
              onClick={() => handleOpenItem(item.title)}
            >
              <div className="finder-item-icon">
                {item.type === "File" ? "📄" : "📁"}
              </div>

              <div className="finder-item-text">
                <div className="finder-item-title">{item.title}</div>
                <div className="finder-item-description">
                  {item.description}
                </div>
              </div>

              <div className="finder-item-type">{item.type}</div>
            </button>
          ))
        ) : (
          <div className="finder-empty">No results found</div>
        )}
      </div>
    </div>
  );
}