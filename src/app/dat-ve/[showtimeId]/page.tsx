import MovieBooking from "@/components/movie-booking"

interface PageProps {
  params: {
    showtimeId: string
  }
}

export default function Page({ params }: PageProps) {
  const { showtimeId } = params;
  return <MovieBooking showtimeId={showtimeId} />
}
