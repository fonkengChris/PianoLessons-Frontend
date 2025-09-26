export default interface SongMedia {
  id: string;
  songId: string;
  type: "audio" | "video" | "sheet_music" | "midi";
  url: string;
  filename: string;
  size: number;
  createdAt: Date;
}
