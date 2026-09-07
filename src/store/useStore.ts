import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  completedLessons: string[];
  completeLesson: (id: string) => void;
  savedCourses: string[];
  toggleSaveCourse: (id: string) => void;
  streak: number;
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
    }),
    {
      name: 'edupro-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
