import { ShowtimeResponse } from "@/types/showtime-response";
import { ShowtimeDetailResponse } from "@/types/showtime-detail-response";
import { API_BACKEND_URL } from "./config";
import { ApiResponse } from "@/types/api-response";
import { ShowtimeRequest } from "@/types/showtime-request";

export async function fetchShowtimesByMovieAndDateAndTheaterId(
  movieCode: string,
  showDate: string,
  theaterId: number
): Promise<ShowtimeResponse[]> {
  const url = `${API_BACKEND_URL}/showtimes/search?movieCode=${movieCode}&showDate=${showDate}&theaterId=${theaterId}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtimes: ${res.status} - ${errorText}`);
  }

  const json: ApiResponse<ShowtimeResponse[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

export async function fetchShowtime(id: string): Promise<ShowtimeDetailResponse> {
  const url = `${API_BACKEND_URL}/showtimes/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch showtime: ${res.status} - ${errorText}`);
  }

  const json: ApiResponse<ShowtimeDetailResponse> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (typeof json.data !== "object" || json.data === null) throw new Error("Invalid data format");

  return json.data;
}