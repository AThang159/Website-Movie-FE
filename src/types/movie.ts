export interface Movie {
  movieId: string;
  title: string;
  englishTitle: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  duration: number;
  rating: number;
  releaseDate: string;
  director: string;
  cast: string[];     
  trailerUrl?: string;
  featured?: boolean;
  isComingSoon?: boolean;
}
