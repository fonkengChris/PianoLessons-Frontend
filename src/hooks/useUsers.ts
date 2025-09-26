import { useQuery } from "@tanstack/react-query";
import { userApi } from "../services/api";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.getAll().then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useUsers;
