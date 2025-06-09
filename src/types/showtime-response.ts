import { MovieResponse } from "./movie-response";
import { Format } from "./format";
import { RoomResponse } from "./room-response";
import { TheaterResponse } from "./theater-response";

export interface ShowtimeResponse {
  id: string,
  movie: MovieResponse;
  showDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  theater?: TheaterResponse;
  room?: RoomResponse;
  language: string;
  price: number;
  status: string;
  seatsAvailable: number
  seatsTotal: number
}
