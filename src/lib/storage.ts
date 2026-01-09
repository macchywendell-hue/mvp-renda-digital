import { UserProfile, UserProgress, LessonProgress } from '@/types/course';

const STORAGE_KEYS = {
  USER_PROFILE: 'despertar_user_profile',
  USER_PROGRESS: 'despertar_user_progress',
};

export function initializeUserData(): { profile: UserProfile; progress: UserProgress } {
  if (typeof window === 'undefined') {
    return {
      profile: createDefaultProfile(),
      progress: createDefaultProgress(),
    };
  }

  let profile = getStoredProfile();
  let progress = getStoredProgress();

  if (!profile) {
    profile = createDefaultProfile();
    saveProfile(profile);
  }

  if (!progress) {
    progress = createDefaultProgress();
    saveProgress(progress);
  }

  return { profile, progress };
}

function createDefaultProfile(): UserProfile {
  return {
    id: generateId(),
    name: 'Estudante',
    email: '',
    createdAt: new Date().toISOString(),
  };
}

function createDefaultProgress(): UserProgress {
  return {
    currentLesson: 1,
    completedLessons: [],
    totalCompleted: 0,
    lessonProgress: {},
  };
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getStoredProfile(): UserProfile | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getStoredProgress(): UserProgress | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving profile:', error);
  }
}

function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function updateLessonProgress(
  lessonId: number,
  completed: boolean,
  feedback?: string,
  rating?: number
): void {
  const progress = getStoredProgress() || createDefaultProgress();

  progress.lessonProgress[lessonId] = {
    lessonId,
    completed,
    completedAt: completed ? new Date().toISOString() : undefined,
    feedback,
    rating,
  };

  if (completed && !progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.totalCompleted = progress.completedLessons.length;
  }

  // Update current lesson to next uncompleted one
  if (completed) {
    const nextLesson = lessonId + 1;
    if (nextLesson <= 20 && !progress.completedLessons.includes(nextLesson)) {
      progress.currentLesson = nextLesson;
    }
  }

  saveProgress(progress);
}

export function getLessonProgress(lessonId: number): LessonProgress | null {
  const progress = getStoredProgress();
  return progress?.lessonProgress[lessonId] || null;
}

export function getCompletionPercentage(): number {
  const progress = getStoredProgress();
  if (!progress) return 0;
  return Math.round((progress.totalCompleted / 20) * 100);
}

export function resetProgress(): void {
  const progress = createDefaultProgress();
  saveProgress(progress);
}
