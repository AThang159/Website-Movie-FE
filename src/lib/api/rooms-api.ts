import { Room } from "@/types/room";

export async function getRoomName(roomId : number): Promise<string> {
  const res = await fetch(`http://localhost:8080/api/rooms/${roomId}/name`);
  if (!res.ok) throw new Error("Failed to fetch room name");
  return res.text();
}