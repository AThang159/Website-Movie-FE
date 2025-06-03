import { Seat } from './seat';

export interface RoomDetail {
  id: string
  name: string
  seat: Seat[];
}