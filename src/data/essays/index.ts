import { essay1 } from "./essay1";
import { essay2 } from "./essay2";
import { essay3 } from "./essay3";
import { essay4 } from "./essay4";

export type Essay = {
  id: number;
  date: string;
  title: string;
  image: string;
  preview: string;
  content: React.ReactNode;
};

export const essays: Essay[] = [essay4, essay3, essay2, essay1];