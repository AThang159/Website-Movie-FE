import { City } from "./city";
import { Room } from "./room";

export interface Theater {
  id: string
  name: string
  address: string
  city: City;
  rooms: Room[];
}