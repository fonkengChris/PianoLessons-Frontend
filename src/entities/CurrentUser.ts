export default interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "super_admin";
  subscriptionActive?: boolean;
  iat: number;
  exp: number;
}
