export default interface Song {
  id: string;
  title: string;
  artist: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  price: number;
  isPremium: boolean;
  mediaFiles: SongMedia[];
  createdAt: Date;
  updatedAt: Date;
} 