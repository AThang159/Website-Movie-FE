import { SeatResponse } from './seat-response';

export interface RoomDetailResponse {
  id: number
  roomCode: string
  name: string
  seats: SeatResponse[];
}