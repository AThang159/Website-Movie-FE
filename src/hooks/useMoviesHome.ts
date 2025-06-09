import { useEffect, useState } from "react";
import { MovieResponse } from "@/types/movie-response";
import { getNowShowingMovies, getComingSoonMovies } from "@/lib/api/backend/movie-api";

export function useMoviesHome() {
  const [nowShowingMovies, setNowShowingMovies] = useState<MovieResponse[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowData, soonData] = await Promise.all([
          getNowShowingMovies(),
          getComingSoonMovies(),
        ]);

        setNowShowingMovies(nowData);
        setComingSoonMovies(soonData);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { nowShowingMovies, comingSoonMovies, loading };
}
