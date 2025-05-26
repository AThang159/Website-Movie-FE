import { TheaterChain } from "./theater-chain";

export interface Theater {
  id: string
  name: string
  address: string
  theaterChain: TheaterChain;
  cityName: string;
}