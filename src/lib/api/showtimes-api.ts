import { Showtime } from "@/types/showtime";

export async function fetchShowtimesByMovieAndDate(movieId: string, showDate: string): Promise<Showtime[]> {
//   console.log("Gửi API với movieId =", movieId, "showDate =", showDate);
  const url = `http://localhost:8080/api/showtimes?movieId=${movieId}&showDate=${showDate}`;
  
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function getShowtime(id: string): Promise<Showtime> {
  const url = `http://localhost:8080/api/showtimes/${id}`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtime: ${res.status} - ${errorText}`);
  }

  return res.json();
}
