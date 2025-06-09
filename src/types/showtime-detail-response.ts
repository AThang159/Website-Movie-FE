import { MovieResponse } from "./movie-response";
import { Format } from "./format";
import { TheaterResponse } from "./theater-response";
import { TicketResponse } from "./ticket-response";
import { RoomDetailResponse } from "./room-detail-response";

export interface ShowtimeDetailResponse {
  id: string,
  movie: MovieResponse;
  showDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  theater?: TheaterResponse;
  room?: RoomDetailResponse;
  language: string;
  format: Format;
  price: number;
  tickets: TicketResponse[];
  status: string;
}
