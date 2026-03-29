export type AppId =
  | "finder"
  | "contracts"
  | "messages"
  | "photos"
  | "notes"
  | "documents"
  | "music"
  | "trash";

export type WindowKey =
  | "Finder"
  | "Contracts"
  | "Messages"
  | "Photos"
  | "Notes"
  | "Documents"
  | "Music"
  | "Trash"
  | "About Me"
  | "Projects"
  | "Blog"
  | "Resume.pdf";

export type DockItemTitle = WindowKey | "Stickies";

export type DesktopApp = {
  title: WindowKey;
  icon: string;
  top?: number;
  left?: number;
  right?: number;
  showOnDesktop?: boolean;
};

export const windowToApp: Record<WindowKey, AppId> = {
  Finder: "finder",
  "About Me": "finder",
  Projects: "finder",
  Blog: "finder",
  "Resume.pdf": "finder",
  Contracts: "contracts",
  Messages: "messages",
  Photos: "photos",
  Notes: "notes",
  Documents: "documents",
  Music: "music",
  Trash: "trash",
};

export const desktopApps: DesktopApp[] = [
  {
    title: "About Me",
    icon: "/icons/Folder.png",
    top: 110,
    right: 48,
    showOnDesktop: true,
  },
  {
    title: "Projects",
    icon: "/icons/Folder.png",
    top: 220,
    right: 48,
    showOnDesktop: true,
  },
  {
    title: "Blog",
    icon: "/icons/Folder.png",
    top: 330,
    right: 48,
    showOnDesktop: true,
  },
  {
    title: "Resume.pdf",
    icon: "/icons/Documents.png",
    top: 440,
    left: 120,
    showOnDesktop: true,
  },
  {
    title: "Trash",
    icon: "/icons/Trash.png",
    top: 580,
    right: 150,
    showOnDesktop: true,
  },
];

export const dockApps: Array<{ title: DockItemTitle; icon: string }> = [
  { title: "Finder", icon: "/icons/Finder.png" },
  { title: "Contracts", icon: "/icons/Contracts.png" },
  { title: "Messages", icon: "/icons/Messages.png" },
  { title: "Photos", icon: "/icons/Photos.png" },
  { title: "Notes", icon: "/icons/Notes.png" },
  { title: "Stickies", icon: "/icons/Stickies.png" },
  { title: "Documents", icon: "/icons/Documents.png" },
  { title: "Music", icon: "/icons/Music.png" },
  { title: "Trash", icon: "/icons/Trash.png" },
];