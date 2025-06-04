import { Movie } from "@/types/movie";
import { API_BASE_URL } from "./config";

export async function getNowShowingMovies(): Promise<Movie[]> {
  const res = await fetch(`${API_BASE_URL}/movies/now-showing`);
  if (!res.ok) throw new Error("Failed to fetch now-showing movies");
  return res.json();
}

export async function getComingSoonMovies(): Promise<Movie[]> {
  const res = await fetch(`${API_BASE_URL}/movies/coming-soon`);
  if (!res.ok) throw new Error("Failed to fetch coming-soon movies");
  return res.json();
}

export async function getMovie(movieId: string): Promise<Movie> {
  const res = await fetch(`${API_BASE_URL}/movies/${movieId}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}

export async function fetchMovies(): Promise<Movie[]> {
  const res = await fetch(`${API_BASE_URL}/movies`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}