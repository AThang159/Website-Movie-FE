import { TheaterResponse } from "@/types/theater-response";
import { API_BACKEND_URL } from "../config";
import { ApiResponse } from "@/types/api-response";
import { TheaterRequest } from "@/types/theater-request";
import { RoomResponse } from "@/types/room-response";

export async function fetchTheaters(): Promise<TheaterResponse[]> {
    const url = `${API_BACKEND_URL}/admin/theaters/all`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch theaters: ${res.status} - ${errorText}`);
    }
  
    const json: ApiResponse<TheaterResponse[]> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
    if (!Array.isArray(json.data)) throw new Error("Invalid data format");
  
    return json.data;
  }

  export async function addTheater(data: TheaterRequest): Promise<TheaterResponse> {
    const res = await fetch(`${API_BACKEND_URL}/admin/theaters/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to add theater: ${res.status} - ${errorText}`);
    }
    const json = await res.json();
    if (!json.success) throw new Error(`API error: ${json.message}`);
    return json.data;
  }
  
  export async function fetchRoomsByTheaterId(theaterId: number): Promise<RoomResponse[]> {
    const url = `${API_BACKEND_URL}/admin/theaters/${theaterId}/rooms`
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    })
  
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to fetch rooms: ${res.status} - ${errorText}`)
    }
  
    const json: ApiResponse<RoomResponse[]> = await res.json()
  
    if (!json.success) throw new Error(`API error: ${json.message}`)
    if (!Array.isArray(json.data)) throw new Error("Invalid data format")
  
    return json.data
  }