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
  windowWidth?: number;
  windowHeight?: number;
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
  Notes: "finder",
  Documents: "finder",
  Music: "music",
  Trash: "finder",
};

export const desktopApps: DesktopApp[] = [
  {
    title: "About Me",
    icon: "/icons/Folder.png",
    topPercent: 22.5,
    leftPercent: 51.67,
    showOnDesktop: true,
    windowWidth: 640,
    windowHeight: 480,
  },
  {
    title: "Projects",
    icon: "/icons/Folder.png",
    topPercent: 46.25,
    leftPercent: 65,
    showOnDesktop: true,
    windowWidth: 980,
    windowHeight: 650,
  },
  {
    title: "Blog",
    icon: "/icons/Folder.png",
    topPercent: 72.5,
    leftPercent: 63,
    showOnDesktop: true,
    windowWidth: 760,
    windowHeight: 560,
  },
  {
    title: "Resume.pdf",
    icon: "/icons/Documents.png",
    topPercent: 40,
    leftPercent: 36.67,
    showOnDesktop: true,
    windowWidth: 820,
    windowHeight: 700,
  },
  {
    title: "Trash",
    icon: "/icons/Trash.png",
    topPercent: 71.25,
    leftPercent: 43.33,
    showOnDesktop: true,
    windowWidth: 520,
    windowHeight: 420,
  },
];

export const dockApps: Array<{
  title: DockItemTitle;
  icon: string;
  windowWidth?: number;
  windowHeight?: number;
}> = [
  {
    title: "Finder",
    icon: "/icons/Finder.png",
    windowWidth: 720,
    windowHeight: 520,
  },
  {
    title: "Contracts",
    icon: "/icons/Contracts.png",
    windowWidth: 700,
    windowHeight: 520,
  },
  {
    title: "Messages",
    icon: "/icons/Messages.png",
    windowWidth: 420,
    windowHeight: 600,
  },
  {
    title: "Photos",
    icon: "/icons/Photos.png",
    windowWidth: 1000,
    windowHeight: 700,
  },
  {
    title: "Music",
    icon: "/icons/Music.png",
    windowWidth: 430,
    windowHeight: 450,
  },
];