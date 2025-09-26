import { useQuery } from "@tanstack/react-query";
import categories from "../data/categories";
import { categoryApi } from "../services/api";
import ms from "ms";

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getAll().then(res => res.data),
    staleTime: ms("24h"),
    initialData: categories,
  });

export default useCategories;
