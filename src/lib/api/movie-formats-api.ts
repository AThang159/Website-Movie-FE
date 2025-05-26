import { Format } from "@/types/movie-format";

export async function fetchMovieFormats(): Promise<Format[]> {
  const res = await fetch("http://localhost:8080/api/movie-formats");
  if (!res.ok) throw new Error("Failed to fetch formats");
  return res.json();
}