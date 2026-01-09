export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  completedAt?: string;
  feedback?: string;
  rating?: number;
}

export interface UserProgress {
  currentLesson: number;
  completedLessons: number[];
  totalCompleted: number;
  lessonProgress: Record<number, LessonProgress>;
}

export type LessonCategory = 'mindset' | 'opportunity' | 'ai-tools' | 'services' | 'marketing';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  duration: string;
  category: LessonCategory;
  icon: string;
  keyPoints: string[];
  actionItems: string[];
}

export interface CourseData {
  lessons: Lesson[];
}
