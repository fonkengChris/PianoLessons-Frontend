import { useQuery } from "@tanstack/react-query";
import { courseApi } from "../services/api";

const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => courseApi.getAll().then(res => res.data.courses),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useCourses;
