
import type { Announcement, VisionMission, Division, NewsArticle, FaqItem, TeamMember } from './types';
import { Megaphone, GraduationCap, PartyPopper, Target, Eye, Gem, Heart, Shield, Sparkles, Brain, Landmark, Palette, Dumbbell, BookOpen, Cpu, Languages, Calendar, ClipboardCheck } from 'lucide-react';


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

export const divisions: Division[] = [
  {
    id: '1',
    title: 'Keimanan',
    department: 'DEPARTEMEN KEROHANIAN',
    description: 'Membentuk karakter spiritual dan moral siswa melalui kegiatan keagamaan yang mendalam.',
    icon: Heart,
    image: 'https://picsum.photos/seed/div1/800/600',
  },
  {
    id: '2',
    title: 'Budi Pekerti',
    department: 'DEPARTEMEN ETIKA',
    description: 'Mengembangkan sopan santun, etika luhur, dan rasa saling menghargai di lingkungan sekolah.',
    icon: Shield,
    image: 'https://picsum.photos/seed/div2/800/600',
  },
  {
    id: '3',
    title: 'Kepribadian Unggul',
    department: 'DEPARTEMEN KEPEMIMPINAN',
    description: 'Membangun jiwa kepemimpinan, kemandirian, dan rasa percaya diri siswa.',
    icon: Sparkles,
    image: 'https://picsum.photos/seed/div3/800/600',
  },
  {
    id: '4',
    title: 'Akademik',
    department: 'DEPARTEMEN PENDIDIKAN',
    description: 'Meningkatkan prestasi akademik dan memperluas wawasan keilmuan melalui program-program berkualitas.',
    icon: Brain,
    image: 'https://picsum.photos/seed/div4/800/600',
  },
  {
    id: '5',
    title: 'Politik',
    department: 'DEPARTEMEN KEWARGANEGARAAN',
    description: 'Memberikan pendidikan demokrasi, kesadaran berbangsa, dan pemahaman politik yang sehat.',
    icon: Landmark,
    image: 'https://picsum.photos/seed/div5/800/600',
  },
  {
    id: '6',
    title: 'Kreativitas',
    department: 'DEPARTEMEN SENI',
    description: 'Mewadahi dan mengembangkan bakat seni, keterampilan, dan daya cipta siswa.',
    icon: Palette,
    image: 'https://picsum.photos/seed/div6/800/600',
  },
  {
    id: '7',
    title: 'Olahraga',
    department: 'DEPARTEMEN JASMANI',
    description: 'Mendukung kesehatan jasmani, semangat sportivitas, dan prestasi di bidang olahraga.',
    icon: Dumbbell,
    image: 'https://picsum.photos/seed/div7/800/600',
  },
  {
    id: '8',
    title: 'Sastra & Budaya',
    department: 'DEPARTEMEN BUDAYA',
    description: 'Melestarikan, mengapresiasi, dan mengembangkan kekayaan sastra dan budaya.',
    icon: BookOpen,
    image: 'https://picsum.photos/seed/div8/800/600',
  },
  {
    id: '9',
    title: 'Teknologi',
    department: 'DEPARTEMEN DIGITAL',
    description: 'Mengembangkan inovasi, literasi digital, dan pemanfaatan teknologi secara positif.',
    icon: Cpu,
    image: 'https://picsum.photos/seed/div9/800/600',
  },
  {
    id: '10',
    title: 'Bahasa Inggris',
    department: 'DEPARTEMEN BAHASA',
    description: 'Meningkatkan kemampuan komunikasi global dan membuka wawasan internasional.',
    icon: Languages,
    image: 'https://picsum.photos/seed/div10/800/600',
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    category: 'Prestasi',
    title: 'SMANSA Raih Juara 1 Nasional Karya Ilmiah Remaja',
    image: 'https://picsum.photos/seed/news1/600/400',
    imageHint: 'academic competition students'
  },
  {
    id: '2',
    category: 'Kegiatan',
    title: 'Tips Mengatur Waktu Antara Belajar & Berorganisasi',
    image: 'https://picsum.photos/seed/news2/600/400',
    imageHint: 'students studying group'
  },
  {
    id: '3',
    category: 'Update',
    title: 'E-Voting Pemilihan Ketua OSIS Resmi Diluncurkan',
    image: 'https://picsum.photos/seed/news3/600/400',
    imageHint: 'student voting election'
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq1",
    question: "Siapa pengelola website ini?",
    answer: "Website ini dikelola penuh oleh Sekbid Teknologi OSIS SMANSA sebagai portofolio inovasi digital sekolah sekaligus kanal informasi publik resmi."
  },
  {
    id: "faq2",
    question: "Syarat daftar pengurus?",
    answer: "Pendaftaran pengurus OSIS biasanya dibuka setiap awal tahun ajaran baru. Syarat utamanya adalah siswa aktif, memiliki komitmen, dan lolos seleksi yang diadakan. Pantau terus informasinya di media sosial kami!"
  },
    {
    id: "faq3",
    question: "Cara kerjasama/sponsor?",
    answer: "Kami sangat terbuka untuk kerjasama dan sponsorship. Anda dapat menghubungi kami melalui halaman Kontak atau mengirimkan proposal langsung ke email OSIS yang tertera di bagian footer."
  }
];

export const teamMembers: TeamMember[] = [
    {
        id: "1",
        name: "wahyu",
        role: "Ketua Umum OSIS",
        image: "https://i.postimg.cc/w3VHmRX2/20251227-001050-0000.png",
        quote: "Bersama kita bisa, bersama kita maju. Mari jadikan OSIS sebagai wadah aspirasi dan kreasi bagi seluruh siswa."
    },
    {
        id: "2",
        name: "crishtian",
        role: "Wakil Ketua OSIS",
        image: "https://i.postimg.cc/Z0cZdv8r/20251227-001050-0001.png",
        quote: "Setiap suara berarti, setiap ide berharga. Jangan ragu untuk berkontribusi demi kemajuan sekolah kita."
    },
    {
        id: "3",
        name: "Putra Perdana",
        role: "Sekretaris Umum",
        image: "https://i.ibb.co/6yvBA0D/Ellipse-3-1.png",
        quote: "Administrasi yang rapi adalah kunci organisasi yang sehat. Saya siap melayani dengan sepenuh hati."
    },
    {
        id: "4",
        name: "Cahaya Putri",
        role: "Bendahara Umum",
        image: "https://i.ibb.co/6yvBA0D/Ellipse-3-1.png",
        quote: "Transparansi dan akuntabilitas adalah prioritas utama dalam mengelola keuangan OSIS."
    }
]
    
    

    
