export interface Showtime {
  id: string,
  movieId?: string;
  showDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  theaterId?: number;
  roomId?: number;
  language: string;
  formatId: number;
  price: number;
}
