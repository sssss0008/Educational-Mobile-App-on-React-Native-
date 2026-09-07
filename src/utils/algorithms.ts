/**
 * Educational Platform Algorithms & Utilities
 * Includes:
 * 1. Spaced Repetition Algorithm (SM-2 for Flashcards & Quiz review)
 * 2. Course Recommendation Engine
 * 3. Progress & Streak Analytics
 * 4. Quiz Performance Grading
 */

export interface SM2Result {
  repetition: number;
  easeFactor: number;
  interval: number;
}

/**
 * SuperMemo SM-2 Spaced Repetition Algorithm
 * @param grade - Quality of response (0-5: 5=perfect, 4=good, 3=pass, 2=hard, 1=bad, 0=complete blackout)
 * @param repetition - Current repetition count
 * @param easeFactor - Current ease factor (default 2.5)
 * @param interval - Current interval in days
 */
export function calculateSM2(
  grade: number,
  repetition: number,
  easeFactor: number = 2.5,
  interval: number = 1
): SM2Result {
  let newRepetition = repetition;
  let newEaseFactor = easeFactor;
  let newInterval = interval;

  if (grade >= 3) {
    if (newRepetition === 0) {
      newInterval = 1;
    } else if (newRepetition === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetition += 1;
  } else {
    newRepetition = 0;
    newInterval = 1;
  }

  newEaseFactor =
    easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  return {
    repetition: newRepetition,
    easeFactor: Number(newEaseFactor.toFixed(2)),
    interval: newInterval,
  };
}

/**
 * Course Recommendation Engine
 * Recommends top courses based on user's preferred categories and ratings.
 */
export function recommendCourses<T extends { category: string; rating: number; progress: number }>(
  courses: T[],
  preferredCategory?: string
): T[] {
  return [...courses].sort((a, b) => {
    // Prioritize preferred category
    if (preferredCategory) {
      if (a.category === preferredCategory && b.category !== preferredCategory) return -1;
      if (b.category === preferredCategory && a.category !== preferredCategory) return 1;
    }
    // Then sort by rating descending, and uncompleted courses first
    if (a.progress !== b.progress) {
      return a.progress - b.progress;
    }
    return b.rating - a.rating;
  });
}

/**
 * Progress & Learning Analytics Calculator
 */
export function calculateProgressAnalytics(completedCount: number, totalCount: number) {
  const percentage = totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;
  const remainingLessons = Math.max(0, totalCount - completedCount);
  const estimatedHoursLeft = (remainingLessons * 0.5).toFixed(1); // Assuming 30 mins per lesson

  return {
    percentage,
    remainingLessons,
    estimatedHoursLeft,
    isCompleted: percentage === 100,
  };
}

/**
 * Quiz Performance & Letter Grading Algorithm
 */
export function evaluateQuizPerformance(correctAnswers: number, totalQuestions: number) {
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  let grade = 'F';
  let passed = false;

  if (percentage >= 90) {
    grade = 'A+';
    passed = true;
  } else if (percentage >= 80) {
    grade = 'A';
    passed = true;
  } else if (percentage >= 70) {
    grade = 'B';
    passed = true;
  } else if (percentage >= 60) {
    grade = 'C';
    passed = true;
  } else if (percentage >= 50) {
    grade = 'D';
    passed = true;
  } else {
    grade = 'F';
    passed = false;
  }

  return {
    percentage,
    grade,
    passed,
    feedback: passed
      ? 'Excellent work! You have mastered the core concepts of this quiz.'
      : 'Keep practicing! Review the lesson explanations and try again to improve your score.',
  };
}
