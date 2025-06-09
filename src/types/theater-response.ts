import { City } from "./city";

export interface TheaterResponse {
  id: number
  name: string
  address: string
  format: string;
  logo: string
  status: string
  city: City;
  totalRooms: number;
}