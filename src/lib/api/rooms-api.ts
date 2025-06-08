import { ApiResponse } from "@/types/api-response";
import { API_BACKEND_URL } from "./config";

export async function getRoomName(roomId: number): Promise<string> {
  const res = await fetch(`${API_BACKEND_URL}/rooms/${roomId}/name`);
  if (!res.ok) throw new Error("Failed to fetch room name");

  const json: ApiResponse<string> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (typeof json.data !== "string") throw new Error("Invalid data format");

  return json.data;
}
