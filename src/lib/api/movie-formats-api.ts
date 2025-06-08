import { Format } from "@/types/format";
import { API_BACKEND_URL } from "./config";
import { ApiResponse } from "@/types/api-response";

export async function fetchMovieFormats(): Promise<Format[]> {
  const res = await fetch(`${API_BACKEND_URL}/movie-formats`);
  if (!res.ok) throw new Error("Failed to fetch formats");

  const json: ApiResponse<Format[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}
