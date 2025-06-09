import { City } from "./city";
import { RoomResponse } from "./room-response";

export interface TheaterDetailRequest {
  id: number
  name: string
  address: string
  format: string,
  city: City;
  status: string;
  rooms: RoomResponse[];
}