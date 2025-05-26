import { Movie } from "@/types/movie";

export async function getNowShowingMovies(): Promise<Movie[]> {
  const res = await fetch("http://localhost:8080/api/movies/now-showing");
  if (!res.ok) throw new Error("Failed to fetch now-showing movies");
  return res.json();
}

export async function getComingSoonMovies(): Promise<Movie[]> {
  const res = await fetch("http://localhost:8080/api/movies/coming-soon");
  if (!res.ok) throw new Error("Failed to fetch coming-soon movies");
  return res.json();
}
