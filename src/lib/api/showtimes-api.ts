import { Showtime } from "@/types/showtime";
import { ShowtimeDetail } from "@/types/showtime-detail";
import { API_BASE_URL } from "./config";
import { ApiResponse } from "@/types/api-response";

export async function fetchShowtimesByMovieAndDateAndTheaterId(
  movieId: string,
  showDate: string,
  theaterId: number
): Promise<Showtime[]> {
  const url = `${API_BASE_URL}/showtimes?movieId=${movieId}&showDate=${showDate}&theaterId=${theaterId}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes: ${res.status} - ${errorText}`);
  }

  const json: ApiResponse<Showtime[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

export async function fetchShowtime(id: string): Promise<ShowtimeDetail> {
  const url = `${API_BASE_URL}/showtimes/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtime: ${res.status} - ${errorText}`);
  }

  const json: ApiResponse<ShowtimeDetail> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (typeof json.data !== "object" || json.data === null) throw new Error("Invalid data format");

  return json.data;
}

export async function fetchShowtimesToday(): Promise<Showtime[]> {
  const url = `${API_BASE_URL}/showtimes/today`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes today: ${res.status} - ${errorText}`);
  }

  const json: ApiResponse<Showtime[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

export async function fetchShowtimes(): Promise<Showtime[]> {
  const url = `${API_BASE_URL}/showtimes`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes: ${res.status} - ${errorText}`);
  }

  const json: ApiResponse<Showtime[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}
