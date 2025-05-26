import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { getNowShowingMovies, getComingSoonMovies } from "@/lib/api/movies-api";

export function useMoviesHome() {
  const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);
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
