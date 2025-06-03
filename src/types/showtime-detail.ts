import { Movie } from "./movie";
import { Format } from "./format";
import { Room } from "./room";
import { SeatStatus } from "./seat-status";
import { Theater } from "./theater";

export interface ShowtimeDetail {
  id: string,
  movie: Movie;
  showDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  theater?: Theater;
  room?: Room;
  language: string;
  format: Format;
  price: number;
}
