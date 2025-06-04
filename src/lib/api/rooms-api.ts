import { Room } from "@/types/room";
import { API_BASE_URL } from "./config";

export async function getRoomName(roomId : number): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/rooms/${roomId}/name`);
  if (!res.ok) throw new Error("Failed to fetch room name");
  return res.text();
}