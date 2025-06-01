export const dynamic = 'force-dynamic';

import MovieBooking from "@/components/movie-booking"

interface PageProps {
  params: {
    showtimeId: string
  }
}

export default async function Page({ params }: PageProps) {
  const showtimeId = params.showtimeId;
  return <MovieBooking showtimeId={showtimeId} />
}
