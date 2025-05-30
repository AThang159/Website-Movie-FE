import { Seat } from './seat';

export interface Room {
  id: string
  name: string
  address: string
  seat: Seat[];
}