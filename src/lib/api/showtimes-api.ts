import { Showtime } from "@/types/showtime";
import { ShowtimeDetail } from "@/types/showtime-detail";

export async function fetchShowtimesByMovieAndDateAndTheaterId(movieId: string, showDate: string, theaterId: number): Promise<Showtime[]> {
//   console.log("Gửi API với movieId =", movieId, "showDate =", showDate);
  const url = `http://localhost:8080/api/showtimes?movieId=${movieId}&showDate=${showDate}&theaterId=${theaterId}`;
  
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function fetchShowtime(id: string): Promise<ShowtimeDetail> {
  const url = `http://localhost:8080/api/showtimes/${id}`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtime: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function fetchShowtimesToday(): Promise<Showtime[]> {
  const url = `http://localhost:8080/api/showtimes/today`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes today`);
  }

  return res.json();
}

export async function fetchShowtimes(): Promise<Showtime[]> {
  const url = `http://localhost:8080/api/showtimes`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes`);
  }

  return res.json();
}