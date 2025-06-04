import { Format } from "@/types/format";
import { API_BASE_URL } from "./config";

export async function fetchMovieFormats(): Promise<Format[]> {
  const res = await fetch(`${API_BASE_URL}/movie-formats`);
  if (!res.ok) throw new Error("Failed to fetch formats");
  return res.json();
}