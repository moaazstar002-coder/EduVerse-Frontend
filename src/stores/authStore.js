import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  
  login: (userData) => {
    const user = { ...userData, id: Date.now() };
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (updates) => {
    set((state) => {
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
}));

export const useCourseStore = create((set) => ({
  enrolledCourses: JSON.parse(localStorage.getItem('enrolledCourses')) || [],
  
  enrollCourse: (courseId) => {
    set((state) => {
      if (!state.enrolledCourses.includes(courseId)) {
        const updated = [...state.enrolledCourses, courseId];
        localStorage.setItem('enrolledCourses', JSON.stringify(updated));
        return { enrolledCourses: updated };
      }
      return state;
    });
  },
  
  updateProgress: (courseId, progress) => {
    const progressData = JSON.parse(localStorage.getItem('courseProgress')) || {};
    progressData[courseId] = progress;
    localStorage.setItem('courseProgress', JSON.stringify(progressData));
  },
  
  getProgress: (courseId) => {
    const progressData = JSON.parse(localStorage.getItem('courseProgress')) || {};
    return progressData[courseId] || 0;
  },
}));
