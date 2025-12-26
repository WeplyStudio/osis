import type { Announcement, Event, TeamMember, VisionMission } from './types';
import { Megaphone, GraduationCap, PartyPopper, Target, Eye, Gem } from 'lucide-react';
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

export const teamMembers: TeamMember[] = [
    {
    id: '1',
    name: 'Budi Dora',
    role: 'Ketua OSIS',
    image: PlaceHolderImages.find(p => p.id === 'team1')?.imageUrl || 'https://picsum.photos/seed/1/400/300',
    bgColor: '',
    quote: 'Harapannya, OSIS SMA Negeri 6 Jakarta dapat menjadi organisasi yang berperan aktif dalam pengembangan potensi minat dan bakat siswa/i. Progresif, kreatif, komunikatif, serta memiliki profesionalitas.'
  },
  {
    id: '2',
    name: 'Siti Wati',
    role: 'Wakil Ketua OSIS',
    image: PlaceHolderImages.find(p => p.id === 'team2')?.imageUrl || 'https://picsum.photos/seed/2/400/300',
    bgColor: '',
    quote: 'Bersama, kita ciptakan lingkungan sekolah yang mendukung, di mana setiap siswa merasa didengar dan dihargai. Mari kita berkolaborasi untuk kemajuan bersama.'
  },
  {
    id: '3',
    name: 'Ahmad Yani',
    role: 'Sekretaris',
    image: PlaceHolderImages.find(p => p.id === 'team3')?.imageUrl || 'https://picsum.photos/seed/3/400/300',
    bgColor: '',
    quote: 'Administrasi yang rapi adalah kunci kelancaran organisasi. Saya berkomitmen untuk memastikan semua program OSIS berjalan dengan teratur dan terdokumentasi dengan baik.'
  },
  {
    id: '4',
    name: 'Rina Rini',
    role: 'Bendahara',
    image: PlaceHolderImages.find(p => p.id === 'team4')?.imageUrl || 'https://picsum.photos/seed/4/400/300',
    bgColor: '',
    quote: 'Transparansi dan pengelolaan keuangan yang bertanggung jawab adalah prioritas saya untuk mendukung semua kegiatan positif yang diselenggarakan oleh OSIS.'
  },
  {
    id: '5',
    name: 'Joko Purnomo',
    role: 'Koordinator Acara',
    image: PlaceHolderImages.find(p => p.id === 'team5')?.imageUrl || 'https://picsum.photos/seed/5/400/300',
    bgColor: '',
    quote: 'Saya siap menghadirkan acara-acara yang tidak hanya seru, tetapi juga mendidik dan berkesan. Mari buat setiap momen di sekolah menjadi tak terlupakan!'
  },
];

export const vision: VisionMission[] = [
    {
        icon: Eye,
        title: "Inovatif",
        description: "Mendorong ide-ide baru dan kreatif untuk kemajuan sekolah.",
        color: "text-blue-400",
    },
    {
        icon: Target,
        title: "Inklusif",
        description: "Menciptakan lingkungan yang merangkul semua siswa tanpa terkecuali.",
        color: "text-green-400",
    },
    {
        icon: Gem,
        title: "Inspiratif",
        description: "Menjadi teladan dan sumber inspirasi bagi seluruh siswa.",
        color: "text-yellow-400",
    }
];

export const mission: VisionMission[] = [
    {
        icon: PartyPopper,
        title: "Acara Berkualitas",
        description: "Menyelenggarakan acara-acara yang seru, mendidik, dan tak terlupakan.",
        color: "text-purple-400",
    },
    {
        icon: Megaphone,
        title: "Aspirasi Siswa",
        description: "Menjadi jembatan antara siswa dan sekolah untuk menyalurkan aspirasi.",
        color: "text-pink-400",
    },
    {
        icon: GraduationCap,
        title: "Pengembangan Diri",
        description: "Menyediakan platform bagi siswa untuk mengembangkan bakat dan minat.",
        color: "text-orange-400",
    }
];

    
