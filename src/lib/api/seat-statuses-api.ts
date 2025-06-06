import { SeatStatus } from "@/types/seat-status"
import { API_BASE_URL } from "./config"
import { ApiResponse } from "@/types/api-response"

export async function fetchSeatStatusesByShowtime(showtimeId: string): Promise<SeatStatus[]> {
  const res = await fetch(`${API_BASE_URL}/seat-statuses/showtime/${showtimeId}`)
  if (!res.ok) throw new Error("Failed to fetch seat statuses")

  const json: ApiResponse<SeatStatus[]> = await res.json()

  if (!json.success) throw new Error(`API error: ${json.message}`)
  if (!Array.isArray(json.data)) throw new Error("Invalid data format")

  return json.data
}
