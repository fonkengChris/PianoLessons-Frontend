import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

const useCustomer = (id?: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const response = await api.get<Customer>(`/customers/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export default useCustomer;
