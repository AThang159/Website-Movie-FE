import { SeatResponse } from './seat-response';

export interface RoomResponse {
  id: number
  roomCode: string;
  name: string
  totalSeats: number;
}