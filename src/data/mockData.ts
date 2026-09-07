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
  {
    id: 'course-5',
    title: 'Deep Learning & Neural Networks with PyTorch',
    category: 'Artificial Intelligence',
    instructor: 'Dr. Andrew Ng Jr.',
    rating: 4.96,
    reviewsCount: 3400,
    lessonsCount: 35,
    duration: '24 hours',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600',
    description: 'Build state-of-the-art convolutional and transformer neural networks using PyTorch and CUDA.',
    progress: 0,
  },
  {
    id: 'course-6',
    title: 'Full-Stack Cloud Architecture on AWS & Kubernetes',
    category: 'Computer Science',
    instructor: 'Marcus Vance',
    rating: 4.88,
    reviewsCount: 1280,
    lessonsCount: 28,
    duration: '20 hours',
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    description: 'Design microservices, deploy Docker containers on Kubernetes, and manage AWS cloud infrastructure.',
    progress: 0,
  },
  {
    id: 'course-7',
    title: 'Cyber Security & Ethical Hacking Masterclass',
    category: 'Cybersecurity',
    instructor: 'Kevin Mitnick Jr.',
    rating: 4.91,
    reviewsCount: 1920,
    lessonsCount: 26,
    duration: '16 hours',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    description: 'Learn penetration testing, vulnerability assessment, cryptography, and secure network defense.',
    progress: 0,
  },
  {
    id: 'course-8',
    title: 'Financial Engineering & Algorithmic Trading',
    category: 'Economics',
    instructor: 'Ray Dalio Jr.',
    rating: 4.82,
    reviewsCount: 890,
    lessonsCount: 22,
    duration: '15 hours',
    price: '$69.99',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    description: 'Program quantitative trading algorithms, backtest portfolios, and analyze market risk models.',
    progress: 0,
  },
  {
    id: 'course-9',
    title: 'Generative AI & Large Language Model Fine-Tuning',
    category: 'Artificial Intelligence',
    instructor: 'Dr. Yann LeCun',
    rating: 4.98,
    reviewsCount: 4100,
    lessonsCount: 32,
    duration: '22 hours',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600',
    description: 'Master prompt engineering, LoRA fine-tuning, RAG pipelines, and transformer attention mechanisms.',
    progress: 45,
  },
  {
    id: 'course-10',
    title: 'Modern UI/UX Design Systems with Figma & Tailwind',
    category: 'Design',
    instructor: 'Jony Ive Studio',
    rating: 4.89,
    reviewsCount: 1750,
    lessonsCount: 20,
    duration: '12 hours',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600',
    description: 'Create scalable design systems, interactive prototypes, and production-ready Tailwind components.',
    progress: 10,
  },
  {
    id: 'course-11',
    title: 'Data Structures & Algorithmic Problem Solving',
    category: 'Computer Science',
    instructor: 'Dr. Donald Knuth',
    rating: 4.94,
    reviewsCount: 3100,
    lessonsCount: 40,
    duration: '30 hours',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600',
    description: 'Ace technical interviews by mastering trees, graphs, dynamic programming, and Big-O complexity.',
    progress: 0,
  },
  {
    id: 'course-12',
    title: 'Organic Chemistry: Structure, Mechanism & Synthesis',
    category: 'Chemistry',
    instructor: 'Dr. Rosalind Franklin',
    rating: 4.78,
    reviewsCount: 720,
    lessonsCount: 25,
    duration: '18 hours',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600',
    description: 'Explore reaction pathways, stereochemistry, spectroscopic analysis, and pharmaceutical synthesis.',
    progress: 0,
  },
  {
    id: 'course-13',
    title: 'Macroeconomics & Global Monetary Policy',
    category: 'Economics',
    instructor: 'Dr. Milton Friedman',
    rating: 4.85,
    reviewsCount: 940,
    lessonsCount: 18,
    duration: '14 hours',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600',
    description: 'Understand central banking, inflation dynamics, fiscal policy, and international trade balance.',
    progress: 0,
  },
  {
    id: 'course-14',
    title: 'Neuroscience & Cognitive Brain Mapping',
    category: 'Medicine',
    instructor: 'Dr. Oliver Sacks',
    rating: 4.92,
    reviewsCount: 1120,
    lessonsCount: 21,
    duration: '15 hours',
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600',
    description: 'Discover synaptic plasticity, fMRI neuroimaging, neural circuits, and cognitive perception.',
    progress: 0,
  },
  {
    id: 'course-15',
    title: 'Blockchain, Smart Contracts & Web3 Development',
    category: 'Computer Science',
    instructor: 'Vitalik Buterin Jr.',
    rating: 4.81,
    reviewsCount: 1450,
    lessonsCount: 24,
    duration: '17 hours',
    price: '$69.99',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600',
    description: 'Write Solidity smart contracts, build decentralized apps (dApps), and audit security vulnerabilities.',
    progress: 0,
  },
  {
    id: 'course-16',
    title: 'Astrophysics & Observational Cosmology',
    category: 'Physics',
    instructor: 'Dr. Carl Sagan Jr.',
    rating: 4.97,
    reviewsCount: 2890,
    lessonsCount: 19,
    duration: '13 hours',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=600',
    description: 'Study stellar evolution, black hole thermodynamics, dark matter, and cosmic microwave background.',
    progress: 0,
  },
  {
    id: 'course-17',
    title: 'Robotics & Autonomous Systems Engineering',
    category: 'Engineering',
    instructor: 'Dr. Nikola Tesla Jr.',
    rating: 4.90,
    reviewsCount: 980,
    lessonsCount: 28,
    duration: '21 hours',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600',
    description: 'Program ROS2, implement Kalman filters, SLAM navigation, and kinematics for robotic arms.',
    progress: 0,
  },
  {
    id: 'course-18',
    title: 'Digital Marketing & Growth Hacking Analytics',
    category: 'Business',
    instructor: 'Seth Godin Jr.',
    rating: 4.79,
    reviewsCount: 1600,
    lessonsCount: 16,
    duration: '10 hours',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=600',
    description: 'Master SEO, funnel optimization, viral loops, and cohort retention analytics for scaleups.',
    progress: 0,
  },
  {
    id: 'course-19',
    title: 'Psychology of Leadership & Behavioral Economics',
    category: 'Psychology',
    instructor: 'Dr. Daniel Kahneman',
    rating: 4.88,
    reviewsCount: 1340,
    lessonsCount: 18,
    duration: '12 hours',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
    description: 'Analyze cognitive biases, decision-making heuristics, and high-performance team leadership.',
    progress: 0,
  },
  {
    id: 'course-20',
    title: 'Bioengineering & CRISPR Genetic Editing',
    category: 'Medicine',
    instructor: 'Dr. Jennifer Doudna Jr.',
    rating: 4.95,
    reviewsCount: 1550,
    lessonsCount: 22,
    duration: '16 hours',
    price: '$69.99',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600',
    description: 'Explore gene editing mechanisms, synthetic biology, bioinformatics, and ethical frameworks.',
    progress: 0,
  },
];

export const LESSONS: Lesson[] = [
  { id: 'lesson-1', courseId: 'course-1', title: 'Introduction to React Native Architecture', duration: '15 mins', type: 'video' },
  { id: 'lesson-2', courseId: 'course-1', title: 'Setting up Expo Router & Navigation', duration: '22 mins', type: 'reading' },
  { id: 'lesson-3', courseId: 'course-1', title: 'State Management with Zustand & Context', duration: '18 mins', type: 'video' },
  { id: 'lesson-4', courseId: 'course-1', title: 'Quiz: React Native Fundamentals', duration: '10 mins', type: 'quiz' },
  { id: 'lesson-5', courseId: 'course-5', title: 'Introduction to PyTorch Tensors & Autograd', duration: '25 mins', type: 'video' },
  { id: 'lesson-6', courseId: 'course-5', title: 'Building Convolutional Neural Networks (CNNs)', duration: '35 mins', type: 'video' },
  { id: 'lesson-7', courseId: 'course-9', title: 'Transformer Attention Mechanisms Explained', duration: '30 mins', type: 'video' },
  { id: 'lesson-8', courseId: 'course-9', title: 'LoRA Fine-Tuning on Custom Datasets', duration: '40 mins', type: 'reading' },
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
  {
    id: 'q3',
    question: 'In PyTorch, what function computes gradients automatically during backpropagation?',
    options: ['backward()', 'gradient()', 'compute()', 'deriv()'],
    correctIndex: 0,
    explanation: 'The backward() function accumulates gradients for tensors with requires_grad=True.',
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
  {
    id: 't-3',
    name: 'Prof. Alexander Wright',
    subject: 'Artificial Intelligence & Deep Learning',
    rating: 4.98,
    hourlyRate: 75,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'AI Research Scientist specializing in transformer models and reinforcement learning.',
  },
];
