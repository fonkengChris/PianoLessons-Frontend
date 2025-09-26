export default interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "super_admin";
  subscriptionActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
