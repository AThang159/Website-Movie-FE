import MovieDetails from "@/components/movie-details"
import ShowtimesSelector from "@/components/showtimes-selector"
import { Header } from "@/components/header";

export default async function MovieShowtimesPage({ params }: { params: { movieId: string } }) {
 
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MovieDetails movieId={params.movieId}/>
      <ShowtimesSelector movieId={params.movieId}/>
    </div>
  )
}