import { Theater } from "@/types/theater"; // Đảm bảo bạn đã định nghĩa type này
import { API_BASE_URL } from "./config";

export async function fetchTheaters(): Promise<Theater[]> {
  const res = await fetch(`${API_BASE_URL}/theaters`);
  if (!res.ok) throw new Error("Failed to fetch theaters for the selected chain");
  return res.json();
}

export async function getTheaterName(theaterId : number): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/theaters/${theaterId}/name`);
  if (!res.ok) throw new Error("Failed to fetch theater name");
  return res.text();
}

export async function fetchTheatersByCityId(cityId: number): Promise<Theater[]> {
  const res = await fetch(`${API_BASE_URL}/theaters?cityId=${cityId}`);
  if (!res.ok) throw new Error("Failed to fetch theater");
  return res.json();
}

export async function addTheater() {
  const res = await fetch(`${API_BASE_URL}/theaters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(""),
  })
  if (!res.ok) throw new Error("Failed to add cinema")
  return res.json()
}