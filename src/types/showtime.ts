export interface Showtime {
  id: string,
  movieId: string;
  showDate: string; // ISO format: '2025-05-26'
  startTime: string; // e.g. '14:00:00'
  endTime: string;
  duration: number;
  theaterId: number;
  theaterRoomId: number;
  language: string; // hoặc enum nếu cần
  formatId: number;
  price: number;
}
