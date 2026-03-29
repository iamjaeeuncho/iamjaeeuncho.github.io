type FinderWindowProps = {
  onOpenWindow: (title: string) => void;
};

export default function FinderWindow({ onOpenWindow }: FinderWindowProps) {
  return (
    <div className="window-content">
      <h2>Finder</h2>
      <ul className="finder-list">
        <li onDoubleClick={() => onOpenWindow("About Me")}>📁 About Me</li>
        <li onDoubleClick={() => onOpenWindow("Projects")}>📁 Projects</li>
        <li onDoubleClick={() => onOpenWindow("Blog")}>📁 Blog</li>
        <li onDoubleClick={() => onOpenWindow("Resume.pdf")}>📄 Resume.pdf</li>
        <li onDoubleClick={() => onOpenWindow("Trash")}>🗑 Trash</li>
      </ul>
    </div>
  );
}