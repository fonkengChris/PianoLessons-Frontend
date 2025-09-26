export default interface Review {
  _id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user?: {
    name: string;
    email: string;
  };
  course?: {
    title: string;
  };
}
