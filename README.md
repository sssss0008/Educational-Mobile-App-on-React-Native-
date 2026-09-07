# EduPro Learning - Mobile Educational Platform

EduPro Learning is a modern, feature-rich cross-platform mobile educational application built with **React Native**, **Expo**, **Expo Router**, **TypeScript**, and **Zustand**. It provides students with world-class courses, AI-powered tutoring, interactive quizzes with spaced repetition algorithms, community discussions, and a dedicated admin management portal.

---

## 🚀 Key Features

1. **Interactive Onboarding & Splash Screen**:
   - Multi-step onboarding carousel with high-quality educational imagery and smooth navigation.
   - Configured splash screen assets and styling for Android & iOS.

2. **World-Class Courses & Lessons**:
   - Comprehensive courses spanning Computer Science, Mathematics, Physics, and History.
   - Video lessons, reading materials, and interactive quizzes.
   - Save favorite courses and track completed lessons in real-time.

3. **Built-in Learning Algorithms (`src/utils/algorithms.ts`)**:
   - **Spaced Repetition (SuperMemo SM-2)**: Calculates ease factors, intervals, and repetition counts for optimal long-term knowledge retention.
   - **Course Recommendation Engine**: Dynamically recommends courses based on user category preferences and ratings.
   - **Progress & Streak Analytics**: Computes overall progress percentages, remaining study hours, and daily learning streaks.
   - **Quiz Performance Grading**: Evaluates score percentages and assigns letter grades (A+ to F) with constructive feedback.

4. **24/7 AI Tutor & Community Hub**:
   - Interactive AI tutor assistant for instant Q&A on any academic topic.
   - Community forum for students to discuss study tips, ask questions, and share insights.

5. **Admin Portal (`/admin`)**:
   - Secure login protected by Administrator ID and Password credentials.
   - Platform analytics overview (active courses, enrolled students).
   - CRUD course management: Publish new courses and delete existing platform courses instantly.

---

## 🔐 Admin Portal Credentials

To access platform management features:
- **Admin ID:** `admin`
- **Password:** `admin123`

---

## 🛠️ Getting Started & How to Run

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Expo Go app on your physical Android/iOS device (or Android Emulator / iOS Simulator)

### Installation & Setup

1. Clone or open the project directory:
   ```bash
   cd Educational-App
   ```

2. Install dependencies (using legacy peer deps for seamless package compatibility):
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Run on your desired platform:
   - **Android Emulator / Device:** Press `a` in the terminal or run:
     ```bash
     npm run android
     ```
   - **iOS Simulator:** Press `i` in the terminal or run:
     ```bash
     npm run ios
     ```
   - **Web Browser:** Press `w` in the terminal or run:
     ```bash
     npm run web
     ```

---

## 📁 Project Architecture

```tree
Educational-App/
├── app/
│   ├── _layout.tsx         # Root layout with stack navigators
│   ├── index.tsx           # Entry router (Onboarding redirect check)
│   ├── onboarding.tsx      # Multi-step onboarding experience
│   ├── (tabs)/             # Bottom tab navigation (Home, Courses, Quiz, Community, Profile)
│   ├── course/[id].tsx     # Course detail view & lesson lists
│   ├── lesson/[id].tsx     # Lesson viewer (Video/Reading)
│   ├── quiz/[id].tsx       # Interactive quiz & SM-2 review
│   ├── tutor/index.tsx     # AI Tutor assistant chat
│   └── admin/index.tsx     # Admin Portal (Login & Course Management)
├── src/
│   ├── constants/Colors.ts # Color palette and theme constants
│   ├── data/mockData.ts    # Courses, lessons, quizzes, tutors dataset
│   ├── store/useStore.ts   # Zustand store (state, onboarding, admin auth, progress)
│   └── utils/algorithms.ts # SM-2 spaced repetition, recommendation, & analytics algorithms
├── assets/                 # App icons, splash screens, and placeholder assets
├── app.json                # Expo configuration & metadata
└── package.json            # Project dependencies & scripts
```

---

## 📄 License
This project is built for educational and demonstration purposes.
