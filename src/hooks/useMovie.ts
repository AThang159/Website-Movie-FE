import { useEffect, useState } from "react";

import { MovieResponse } from "@/types/movie-response";

export function useMovie(movieId: string) {
  const [movie, setMovie] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/movies/${movieId}`);
        if (!res.ok) throw new Error("Movie not found");

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie", err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  return { movie, loading };
}
