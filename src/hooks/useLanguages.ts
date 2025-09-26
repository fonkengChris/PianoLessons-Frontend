import { useQuery } from "@tanstack/react-query";
import { languageApi } from "../services/api";

const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () => languageApi.getAll().then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useLanguages;
