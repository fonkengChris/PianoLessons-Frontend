import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Course } from "../entities/Course";

const useCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get<Course>(`/courses/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export default useCourse;
