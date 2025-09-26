export default interface Lesson {
  _id: string;
  courseId: string | { _id: string; title: string }; // Can be string or populated object
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in minutes
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
