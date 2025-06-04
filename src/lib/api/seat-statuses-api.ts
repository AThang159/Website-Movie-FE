import { SeatStatus } from "@/types/seat-status"
import { API_BASE_URL } from "./config"

export async function fetchSeatStatusesByShowtime(showtimeId: string): Promise<SeatStatus[]> {
  const res = await fetch(`${API_BASE_URL}/seat-statuses/showtime/${showtimeId}`)
  if (!res.ok) throw new Error("Failed to fetch seat statuses")
  return res.json()
}
