import { Theater } from "@/types/theater"; // Đảm bảo đã định nghĩa type này
import { API_BACKEND_URL } from "./config";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function fetchTheaters(): Promise<Theater[]> {
  const res = await fetch(`${API_BACKEND_URL}/theaters`);
  if (!res.ok) throw new Error("Failed to fetch theaters for the selected chain");

  const json: ApiResponse<Theater[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

export async function getTheaterName(theaterId: number): Promise<string> {
  const res = await fetch(`${API_BACKEND_URL}/theaters/${theaterId}/name`);
  if (!res.ok) throw new Error("Failed to fetch theater name");
  return res.text();
}

export async function fetchTheatersByCityId(cityId: number): Promise<Theater[]> {
  const res = await fetch(`${API_BACKEND_URL}/theaters?cityId=${cityId}`);
  if (!res.ok) throw new Error("Failed to fetch theaters by city");

  const json: ApiResponse<Theater[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}

export async function addTheater(): Promise<any> {
  const res = await fetch(`${API_BACKEND_URL}/theaters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to add theater: ${res.status} - ${errorText}`);
  }
  const json = await res.json();
  if (!json.success) throw new Error(`API error: ${json.message}`);
  return json.data;
}
