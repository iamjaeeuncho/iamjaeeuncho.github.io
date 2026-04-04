export type SearchItem = {
  id: number;
  title: string;
  type: string;
  description: string;
};

export const searchItems: SearchItem[] = [
  { id: 1, title: "Finder", type: "App", description: "View all files" },
  { id: 2, title: "Contracts", type: "App", description: "Open contracts" },
  { id: 3, title: "Messages", type: "App", description: "Open Q&A" },
  { id: 4, title: "Photos", type: "App", description: "Open photos" },
  { id: 7, title: "Music", type: "App", description: "Open music" },
  { id: 8, title: "Archive", type: "App", description: "Open archive" },
  { id: 9, title: "Terminal", type: "App", description: "Open terminal" },
  { id: 10, title: "Trash", type: "Folder", description: "Open trash" },
  { id: 11, title: "About Me", type: "Folder", description: "About me folder" },
  { id: 12, title: "Projects", type: "Folder", description: "Projects folder" },
  { id: 13, title: "Blog", type: "Folder", description: "Blog folder" },
  { id: 14, title: "Resume.pdf", type: "File", description: "Open resume" },
];