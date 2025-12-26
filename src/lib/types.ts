import type { LucideIcon } from "lucide-react";

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  icon: LucideIcon;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
};
