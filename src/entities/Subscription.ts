export interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  endDate: Date;
}
