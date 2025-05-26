import { Theater } from "@/types/theater"; // Đảm bảo bạn đã định nghĩa type này

export async function fetchTheaters(): Promise<Theater[]> {
  const res = await fetch("http://localhost:8080/api/theaters");
  if (!res.ok) throw new Error("Failed to fetch theaters for the selected chain");
  return res.json();
}