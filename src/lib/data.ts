import type { Announcement, Event } from './types';
import { Megaphone, GraduationCap, PartyPopper } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Upcoming School Festival!',
    content: 'Get ready for a day of fun, food, and performances. More details to come soon.',
    date: '2 days ago',
    icon: PartyPopper,
  },
  {
    id: '2',
    title: 'Mid-term Exam Schedule',
    content: 'The schedule for the upcoming mid-term exams has been released. Please check the student portal.',
    date: '5 days ago',
    icon: GraduationCap,
  },
  {
    id: '3',
    title: 'Call for Volunteers',
    content: 'We are looking for volunteers for the annual charity drive. Sign up now!',
    date: '1 week ago',
    icon: Megaphone,
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Annual School Festival',
    description: 'Join us for a day of exciting games, delicious food stalls, and amazing student performances. A day not to be missed!',
    date: 'October 28, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'School Field',
    image: PlaceHolderImages.find(p => p.id === "event1")?.imageUrl || '',
  },
  {
    id: '2',
    title: 'Music & Arts Night',
    description: 'An evening dedicated to showcasing the incredible musical and artistic talents of our students. Come and be inspired.',
    date: 'November 15, 2024',
    time: '7:00 PM - 9:00 PM',
    location: 'Auditorium',
    image: PlaceHolderImages.find(p => p.id === "event2")?.imageUrl || '',
  },
  {
    id: '3',
    title: 'Tech Symposium 2024',
    description: 'Explore the latest in technology with guest speakers, workshops, and interactive demos. Open to all students.',
    date: 'December 5, 2024',
    time: '9:00 AM - 3:00 PM',
    location: 'Main Hall',
    image: PlaceHolderImages.find(p => p.id === "event3")?.imageUrl || '',
  },
];
