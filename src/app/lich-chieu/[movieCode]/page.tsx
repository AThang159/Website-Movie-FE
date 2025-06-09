import MovieDetails from "@/components/movie-details"
import ShowtimesSelector from "@/components/showtimes-selector"
import { Header } from "@/components/header";

export default async function MovieShowtimesPage({ params }: { params: { movieCode: string } }) {
 
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MovieDetails movieCode={params.movieCode}/>
      <ShowtimesSelector movieCode={params.movieCode}/>
    </div>
  )
}