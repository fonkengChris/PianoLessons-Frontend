import { useQuery } from "@tanstack/react-query";
import { lessonApi } from "../services/api";
import { Lesson } from "../entities/Lesson";

const useLessons = (courseId?: string, isAuthenticated?: boolean) => {
  const enabled = !!courseId && !!isAuthenticated;
  
  console.log("useLessons Debug:");
  console.log("- courseId:", courseId);
  console.log("- isAuthenticated:", isAuthenticated);
  console.log("- enabled:", enabled);
  
  return useQuery({
    queryKey: ["lessons", courseId],
    queryFn: async () => {
      console.log("useLessons: Making API call for courseId:", courseId);
      if (!courseId) return [];
      const response = await lessonApi.getByCourse(courseId);
      console.log("useLessons: API response:", response.data);
      return response.data;
    },
    enabled,
    retry: (failureCount, error: any) => {
      console.log("useLessons: Retry attempt", failureCount, "Error:", error);
      // Don't retry on 403 Forbidden (but still try once)
      if (error?.response?.status === 403) {
        return failureCount < 1;
      }
      return failureCount < 3;
    },
  });
};

export default useLessons;
