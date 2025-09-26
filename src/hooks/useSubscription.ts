import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { UserSubscription } from "../entities/Subscription";
import useAuth from "./useAuth";

export const useSubscription = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  const {
    data: subscription,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await api.get<UserSubscription>(
        `/subscriptions/status`
      );
      return response.data;
    },
    enabled: !!auth?.user, // Only fetch if user is authenticated
    retry: (failureCount, error: any) => {
      // Don't retry on 404 (no subscription exists)
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const subscribe = useMutation({
    mutationFn: async (planId: string) => {
      const response = await api.post(`/subscriptions/subscribe`, {
        planId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });

  // Use subscriptionActive from user object as fallback
  const isSubscribed = subscription?.hasActiveSubscription || auth?.user?.subscriptionActive || false;

  return {
    subscription,
    error,
    isLoading,
    subscribe: subscribe.mutate,
    isSubscribed,
  };
};

export default useSubscription;
