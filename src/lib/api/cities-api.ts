import { City } from "@/types/city";
import { API_BASE_URL } from "./config";

export async function fetchCities(): Promise<City[]> {
  const res = await fetch(`${API_BASE_URL}/cities`);
  if (!res.ok) throw new Error("Failed to fetch cities");
  return res.json();
}