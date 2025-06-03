import { City } from "./city";

export interface Theater {
  id: number
  name: string
  address: string
  logo: string
  status: string
  city: City;
}