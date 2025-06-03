import { Theater } from "@/types/theater"; // Đảm bảo bạn đã định nghĩa type này

export async function fetchTheaters(): Promise<Theater[]> {
  const res = await fetch("http://localhost:8080/api/theaters");
  if (!res.ok) throw new Error("Failed to fetch theaters for the selected chain");
  return res.json();
}

export async function getTheaterName(theaterId : number): Promise<string> {
  const res = await fetch(`http://localhost:8080/api/theaters/${theaterId}/name`);
  if (!res.ok) throw new Error("Failed to fetch theater name");
  return res.text();
}

export async function fetchTheatersByCityId(cityId: number): Promise<Theater[]> {
  const res = await fetch(`http://localhost:8080/api/theaters?cityId=${cityId}`);
  if (!res.ok) throw new Error("Failed to fetch theater");
  return res.json();
}