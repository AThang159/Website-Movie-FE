import { TheaterResponse } from "@/types/theater-response";
import { API_BACKEND_URL } from "./config";
import { ApiResponse } from "@/types/api-response";
import { TheaterRequest } from "@/types/theater-request";



export async function fetchTheatersByCityId(cityId: number): Promise<TheaterResponse[]> {
  const res = await fetch(`${API_BACKEND_URL}/theaters/by-city?cityId=${cityId}`);
  if (!res.ok) throw new Error("Failed to fetch theaters by city");

  const json: ApiResponse<TheaterResponse[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

