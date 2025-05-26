import MovieDetails from "@/components/movie-details"
import ShowtimesSelector from "@/components/showtimes-selector"

export default async function MovieShowtimesPage({ params }: { params: { movieId: string } }) {
 
  return (
    <div className="flex min-h-screen flex-col">
      <MovieDetails movieId={params.movieId}/>
      <ShowtimesSelector movieId={params.movieId}/>
    </div>
  )
}