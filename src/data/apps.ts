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
  topPercent?: number;
  leftPercent?: number;
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
    topPercent: 22.5,
    leftPercent: 51.67,
    showOnDesktop: true,
  },
  {
    title: "Projects",
    icon: "/icons/Folder.png",
    topPercent: 46.25,
    leftPercent: 65,
    showOnDesktop: true,
  },
  {
    title: "Blog",
    icon: "/icons/Folder.png",
    topPercent: 72.5,
    leftPercent: 63,
    showOnDesktop: true,
  },
  {
    title: "Resume.pdf",
    icon: "/icons/Documents.png",
    topPercent: 40,
    leftPercent: 36.67,
    showOnDesktop: true,
  },
  {
    title: "Trash",
    icon: "/icons/Trash.png",
    topPercent: 71.25,
    leftPercent: 43.33,
    showOnDesktop: true,
  },
];

export const dockApps: Array<{ title: DockItemTitle; icon: string }> = [
  { title: "Finder", icon: "/icons/Finder.png" },
  { title: "Contracts", icon: "/icons/Contracts.png" },
  { title: "Messages", icon: "/icons/Messages.png" },
  { title: "Photos", icon: "/icons/Photos.png" },
  { title: "Music", icon: "/icons/Music.png" },
];