import { useQuery } from "@tanstack/react-query";
import { lessonApi } from "../services/api";
import { Lesson } from "../entities/Lesson";

const useLessons = (courseId?: string, isAuthenticated?: boolean) => {
  return useQuery({
    queryKey: ["lessons", courseId],
    queryFn: async () => {
      if (!courseId) return [];
      const response = await lessonApi.getByCourse(courseId);
      return response.data;
    },
    enabled: !!courseId && !!isAuthenticated,
    retry: (failureCount, error: any) => {
      // Don't retry on 403 Forbidden (but still try once)
      if (error?.response?.status === 403) {
        return failureCount < 1;
      }
      return failureCount < 3;
    },
  });
};

export default useLessons;
