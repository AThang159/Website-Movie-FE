import { City } from "@/types/city";
import { API_BACKEND_URL } from "./config";
import { ApiResponse } from "@/types/api-response";

export async function fetchCities(): Promise<City[]> {
  const res = await fetch(`${API_BACKEND_URL}/cities`);
  if (!res.ok) throw new Error("Failed to fetch cities");

  const json: ApiResponse<City[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}
