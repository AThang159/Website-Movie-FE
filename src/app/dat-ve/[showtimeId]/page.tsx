export const dynamic = 'force-dynamic';

import MovieBooking from "@/components/movie-booking"
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface PageProps {
  params: {
    showtimeId: string
  }
}

export default async function Page({ params }: PageProps) {
  const showtimeId = params.showtimeId;
  return (
    <div>
      <Header />
      <MovieBooking showtimeId={showtimeId} />
      <Footer />
    </div>
  )
}
