export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  reviewsCount: number;
  lessonsCount: number;
  duration: string;
  price: string;
  image: string;
  description: string;
  progress: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Discussion {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  time: string;
}

export interface Tutor {
  id: string;
  name: string;
  subject: string;
  rating: number;
  hourlyRate: number;
  image: string;
  bio: string;
}

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced React Native & Expo Mastery',
    category: 'Computer Science',
    instructor: 'Prof. Sarah Jenkins',
    rating: 4.9,
    reviewsCount: 1420,
    lessonsCount: 24,
    duration: '12 hours',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    description: 'Master mobile app development with React Native, Expo Router, TypeScript, and native modules.',
    progress: 65,
  },
  {
    id: 'course-2',
    title: 'Calculus & Linear Algebra for Machine Learning',
    category: 'Mathematics',
    instructor: 'Dr. Alan Turing',
    rating: 4.8,
    reviewsCount: 980,
    lessonsCount: 30,
    duration: '18 hours',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
    description: 'Understand the mathematical foundations of AI, neural networks, derivatives, and matrix operations.',
    progress: 20,
  },
  {
    id: 'course-3',
    title: 'Quantum Physics: From Quarks to the Cosmos',
    category: 'Physics',
    instructor: 'Dr. Richard Feynman Jr.',
    rating: 4.95,
    reviewsCount: 2150,
    lessonsCount: 18,
    duration: '10 hours',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    description: 'Explore wave-particle duality, quantum entanglement, and the standard model of particle physics.',
    progress: 90,
  },
  {
    id: 'course-4',
    title: 'World History: Empires, Revolutions & Modern Era',
    category: 'History',
    instructor: 'Dr. Elena Rostova',
    rating: 4.7,
    reviewsCount: 650,
    lessonsCount: 22,
    duration: '14 hours',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600',
    description: 'Journey through pivotal historical epochs that shaped modern geopolitical boundaries and societies.',
    progress: 0,
  },
];

export const LESSONS: Lesson[] = [
  { id: 'lesson-1', courseId: 'course-1', title: 'Introduction to React Native Architecture', duration: '15 mins', type: 'video' },
  { id: 'lesson-2', courseId: 'course-1', title: 'Setting up Expo Router & Navigation', duration: '22 mins', type: 'reading' },
  { id: 'lesson-3', courseId: 'course-1', title: 'State Management with Zustand & Context', duration: '18 mins', type: 'video' },
  { id: 'lesson-4', courseId: 'course-1', title: 'Quiz: React Native Fundamentals', duration: '10 mins', type: 'quiz' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary rendering engine used by modern React Native on Android by default?',
    options: ['JSC (JavaScriptCore)', 'Hermes', 'V8 Engine', 'WebKit'],
    correctIndex: 1,
    explanation: 'Hermes is an open-source JavaScript engine optimized for running React Native apps on Android.',
  },
  {
    id: 'q2',
    question: 'Which file-based routing library is standard for Expo SDK 50+ applications?',
    options: ['React Navigation', 'Expo Router', 'React Router Native', 'Wouter'],
    correctIndex: 1,
    explanation: 'Expo Router brings file-system routing built on top of React Navigation to React Native.',
  },
];

export const DISCUSSIONS: Discussion[] = [
  {
    id: 'disc-1',
    author: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    title: 'Best practices for handling offline state in React Native?',
    content: 'Hey everyone, I am building an offline-first learning app. Should I use MMKV or SQLite for caching course materials?',
    likes: 24,
    replies: 8,
    time: '2 hours ago',
  },
  {
    id: 'disc-2',
    author: 'Maria Garcia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    title: 'Tips for mastering Linear Algebra for Machine Learning',
    content: 'Eigenvalues and eigenvectors seemed abstract at first, but visualizing linear transformations made all the difference!',
    likes: 42,
    replies: 15,
    time: 'Yesterday',
  },
];

export const TUTORS: Tutor[] = [
  {
    id: 't-1',
    name: 'Dr. Robert Vance',
    subject: 'Advanced Mathematics & Calculus',
    rating: 4.95,
    hourlyRate: 45,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Ph.D. in Mathematics from MIT with 10+ years of university teaching experience.',
  },
  {
    id: 't-2',
    name: 'Dr. Sophia Martinez',
    subject: 'Computer Science & Software Architecture',
    rating: 4.9,
    hourlyRate: 55,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Senior Principal Engineer and guest lecturer in distributed systems.',
  },
];
