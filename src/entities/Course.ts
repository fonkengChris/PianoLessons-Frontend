export default interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
