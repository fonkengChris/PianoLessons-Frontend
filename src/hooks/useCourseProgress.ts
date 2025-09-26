import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  lastAccessedLesson: string;
  completionDate?: Date;
}

export const useCourseProgress = (courseId: string) => {
  const queryClient = useQueryClient();

  const {
    data: progress,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["courseProgress", courseId],
    queryFn: async () => {
      const response = await api.get<CourseProgress>(
        `/progress/${courseId}`
      );
      return response.data;
    },
  });

  const updateProgress = useMutation({
    mutationFn: async (lessonId: string) => {
      const response = await api.patch(`/progress/${courseId}`, {
        completedLessons: [...(progress?.completedLessons || []), lessonId],
        lastAccessedLesson: lessonId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseProgress", courseId] });
    },
  });

  return {
    progress,
    error,
    isLoading,
    updateProgress: updateProgress.mutate,
  };
};

export default useCourseProgress;
