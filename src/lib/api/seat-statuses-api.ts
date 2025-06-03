import { SeatStatus } from "@/types/seat-status"

export async function fetchSeatStatusesByShowtime(showtimeId: string): Promise<SeatStatus[]> {
  const res = await fetch(`http://localhost:8080/api/seat-statuses/showtime/${showtimeId}`)
  if (!res.ok) throw new Error("Failed to fetch seat statuses")
  return res.json()
}
