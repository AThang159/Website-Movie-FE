import { City } from "@/types/city";

export async function fetchCities(): Promise<City[]> {
  const res = await fetch("http://localhost:8080/api/cities");
  if (!res.ok) throw new Error("Failed to fetch cities");
  return res.json();
}