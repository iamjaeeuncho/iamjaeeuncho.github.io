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
  { id: 5, title: "Music", type: "App", description: "Open music" },
  { id: 6, title: "Archive", type: "App", description: "Open archive" },
  { id: 7, title: "Terminal", type: "App", description: "Open terminal" },
  { id: 8, title: "Trash", type: "Folder", description: "Open trash" },
  { id: 9, title: "About Me", type: "Folder", description: "About me folder" },
  { id: 10, title: "Projects", type: "Folder", description: "Projects folder" },
  { id: 11, title: "Blog", type: "Folder", description: "Blog folder" },
  { id: 12, title: "Resume.pdf", type: "File", description: "Open resume" },
];