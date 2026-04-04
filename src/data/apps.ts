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
  | "Resume.pdf"
  | "Archive"
  | "Terminal"
  | "Blog";

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
  "About Me": "notes",
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
  Archive: "finder",
  Terminal: "finder",
};

export const desktopApps: DesktopApp[] = [
  {
    title: "About Me",
    icon: "/icons/Notes.png",
    topPercent: 22.5,
    leftPercent: 51.67,
    showOnDesktop: true,
    windowWidth: 800,
    windowHeight: 580,
  },
  {
    title: "Projects",
    icon: "/icons/Folder.png",
    topPercent: 46.25,
    leftPercent: 65,
    showOnDesktop: true,
    windowWidth: 800,
    windowHeight: 580,
  },
  {
    title: "Blog",
    icon: "/icons/TextEdit.png",
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
    windowWidth: 700,
    windowHeight: 600,
  },
  {
    title: "Trash",
    icon: "/icons/Trash.png",
    topPercent: 71.25,
    leftPercent: 43.33,
    showOnDesktop: true,
    windowWidth: 500,
    windowHeight: 600,
  },
];

export const dockApps: Array<{
  title: DockItemTitle;
  icon: string;
  href?: string;
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
    windowWidth: 600,
    windowHeight: 500,
  },
  {
    title: "Messages",
    icon: "/icons/Messages.png",
    windowWidth: 540,
    windowHeight: 620,
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
  {
    title: "Archive",
    icon: "/icons/Books.png",
    href: "https://iamjaeeuncho.tistory.com",
    windowWidth: 430,
    windowHeight: 450,
  },
  {
    title: "Terminal",
    icon: "/icons/Terminal.png",
    windowWidth: 540,
    windowHeight: 540,
  },
];

export type StickyNoteLine = {
  text: string;
  decoration?: boolean;
};

export type StickyNoteData = {
  title: string;
  top: number;
  left: number;
  lines: StickyNoteLine[];
};

export const stickyNotes: StickyNoteData[] = [
  {
    title: "To Do List",
    top: 100,
    left: 75,
    lines: [
      { text: "Become a full-stack developer" },
      { text: "Build and launch a service" },
      { text: "Create a sleek portfolio website", decoration: true },
      { text: "World domination - in progress..." },
      { text: "Work hard, Play harder!" },
    ],
  },
];