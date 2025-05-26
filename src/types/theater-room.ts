import { Seat } from './seat';

export interface TheaterRoom {
  id: string
  name: string
  address: string
  seat: Seat[];
}