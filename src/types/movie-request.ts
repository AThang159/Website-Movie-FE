export interface MovieRequest {
    movieCode: string;
    title: string;
    englishTitle: string;
    posterUrl: string;
    backdropUrl: string;
    genres: string[];
    duration: number;
    releaseDate: string;
    director: string;
    castList: string[];
    trailerUrl: string;
    featured: boolean;
    status: string;
  }