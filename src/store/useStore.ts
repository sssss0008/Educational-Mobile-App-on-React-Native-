import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COURSES, Course } from '../data/mockData';

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
        // Default Admin credentials: ID: admin, Password: admin123
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
    }),
    {
      name: 'edupro-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
