import { MovieResponse } from "@/types/movie-response";
import { API_BACKEND_URL } from "./config";
import { ApiResponse } from "@/types/api-response";

export async function getNowShowingMovies(): Promise<MovieResponse[]> {
  const res = await fetch(`${API_BACKEND_URL}/movies/now-showing`);
  if (!res.ok) throw new Error("Failed to fetch now-showing movies");

  const json: ApiResponse<MovieResponse[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

export async function getComingSoonMovies(): Promise<MovieResponse[]> {
  const res = await fetch(`${API_BACKEND_URL}/movies/coming-soon`);
  if (!res.ok) throw new Error("Failed to fetch coming-soon movies");

  const json: ApiResponse<MovieResponse[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

export async function fetchMovie(movieId: string): Promise<MovieResponse> {
  const res = await fetch(`${API_BACKEND_URL}/movies/${movieId}`);
  if (!res.ok) throw new Error("Failed to fetch movie");

  const json: ApiResponse<MovieResponse> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (typeof json.data !== "object" || json.data === null)
    throw new Error("Invalid data format");

  return json.data;
}

