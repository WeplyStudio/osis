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

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  bgColor: string;
  quote: string;
};

export type VisionMission = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
};

export type Division = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
};
