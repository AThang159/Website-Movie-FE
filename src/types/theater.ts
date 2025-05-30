import { Chain } from "./chain";

export interface Theater {
  id: string
  name: string
  address: string
  chain: Chain;
  cityName: string;
}