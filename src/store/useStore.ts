import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COURSES, Course, DISCUSSIONS, Discussion } from '../data/mockData';

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  completedLessons: string[];
  completeLesson: (id: string) => void;
  savedCourses: string[];
  toggleSaveCourse: (id: string) => void;
  streak: number;

  // Onboarding
  isOnboardingCompleted: boolean;
  completeOnboarding: () => void;

  // Admin Portal state
  isAdminLoggedIn: boolean;
  adminLogin: (id: string, pass: string) => boolean;
  adminLogout: () => void;
  adminCourses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  adminAnnouncements: string[];
  addAnnouncement: (msg: string) => void;

  // New Features (20+ Advanced Capabilities)
  notes: Record<string, string>;
  saveNote: (lessonId: string, note: string) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  discussions: Discussion[];
  addDiscussion: (disc: Discussion) => void;
  likeDiscussion: (id: string) => void;

  bookedTutors: string[];
  bookTutor: (tutorId: string) => void;

  offlineCourses: string[];
  toggleOfflineCourse: (id: string) => void;

  flashcardMastery: Record<string, number>; // quizId -> SM-2 grade level
  updateFlashcardMastery: (quizId: string, grade: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      completedLessons: ['lesson-1', 'lesson-2'],
      completeLesson: (id) => {
        if (!get().completedLessons.includes(id)) {
          set({ completedLessons: [...get().completedLessons, id] });
        }
      },
      savedCourses: ['course-1', 'course-3'],
      toggleSaveCourse: (id) => {
        const saved = get().savedCourses;
        if (saved.includes(id)) {
          set({ savedCourses: saved.filter(c => c !== id) });
        } else {
          set({ savedCourses: [...saved, id] });
        }
      },
      streak: 5,

      // Onboarding
      isOnboardingCompleted: false,
      completeOnboarding: () => set({ isOnboardingCompleted: true }),

      // Admin Auth & Management
      isAdminLoggedIn: false,
      adminLogin: (id: string, pass: string) => {
        if (id.trim() === 'admin' && pass.trim() === 'admin123') {
          set({ isAdminLoggedIn: true });
          return true;
        }
        return false;
      },
      adminLogout: () => set({ isAdminLoggedIn: false }),
      adminCourses: COURSES,
      addCourse: (course: Course) => {
        set({ adminCourses: [course, ...get().adminCourses] });
      },
      deleteCourse: (id: string) => {
        set({ adminCourses: get().adminCourses.filter(c => c.id !== id) });
      },
      adminAnnouncements: ['Welcome to EduPro Learning Fall Semester 2026! Check out new AI Quantum Computing modules.'],
      addAnnouncement: (msg: string) => {
        set({ adminAnnouncements: [msg, ...get().adminAnnouncements] });
      },

      // New Advanced Features State
      notes: {},
      saveNote: (lessonId, note) => {
        set({ notes: { ...get().notes, [lessonId]: note } });
      },

      notifications: [
        { id: 'n1', title: 'New Quiz available: React Native Hooks', time: '10m ago', read: false },
        { id: 'n2', title: 'Dr. Robert Vance accepted your tutoring request', time: '2h ago', read: false },
        { id: 'n3', title: 'Your 5-day learning streak is active!', time: '1d ago', read: true },
      ],
      markNotificationRead: (id) => {
        set({
          notifications: get().notifications.map(n => n.id === id ? { ...n, read: true } : n)
        });
      },

      discussions: DISCUSSIONS,
      addDiscussion: (disc) => {
        set({ discussions: [disc, ...get().discussions] });
      },
      likeDiscussion: (id) => {
        set({
          discussions: get().discussions.map(d => d.id === id ? { ...d, likes: d.likes + 1 } : d)
        });
      },

      bookedTutors: [],
      bookTutor: (tutorId) => {
        if (!get().bookedTutors.includes(tutorId)) {
          set({ bookedTutors: [...get().bookedTutors, tutorId] });
        }
      },

      offlineCourses: ['course-1'],
      toggleOfflineCourse: (id) => {
        const offline = get().offlineCourses;
        if (offline.includes(id)) {
          set({ offlineCourses: offline.filter(c => c !== id) });
        } else {
          set({ offlineCourses: [...offline, id] });
        }
      },

      flashcardMastery: {},
      updateFlashcardMastery: (quizId, grade) => {
        set({ flashcardMastery: { ...get().flashcardMastery, [quizId]: grade } });
      },
    }),
    {
      name: 'edupro-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
