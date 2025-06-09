import { ShowtimeResponse } from "@/types/showtime-response";
import { API_BACKEND_URL } from "../config";
import { ApiResponse } from "@/types/api-response";
import { ShowtimeRequest } from "@/types/showtime-request";
import { ShowtimeDetailResponse } from "@/types/showtime-detail-response";

export async function fetchShowtimesToday(): Promise<ShowtimeResponse[]> {
    const url = `${API_BACKEND_URL}/admin/showtimes/today`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch showtimes today: ${res.status} - ${errorText}`);
    }
  
    const json: ApiResponse<ShowtimeResponse[]> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
    if (!Array.isArray(json.data)) throw new Error("Invalid data format");
  
    return json.data;
  }
  
  export async function fetchShowtimes(): Promise<ShowtimeResponse[]> {
    const url = `${API_BACKEND_URL}/admin/showtimes/all`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch showtimes: ${res.status} - ${errorText}`);
    }
  
    const json: ApiResponse<ShowtimeResponse[]> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
    if (!Array.isArray(json.data)) throw new Error("Invalid data format");
  
    return json.data;
  }
  
  export async function addShowtime(data: ShowtimeRequest): Promise<ShowtimeDetailResponse> {
    const url = `${API_BACKEND_URL}/admin/showtimes/add`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to add showtime: ${res.status} - ${errorText}`);
    }
  
    const json: ApiResponse<ShowtimeDetailResponse> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
    return json.data;
  }
  
  export async function updateShowtime(id: string, data: ShowtimeRequest): Promise<ShowtimeDetailResponse> {
    const url = `${API_BACKEND_URL}/admin/showtimes/update/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update showtime: ${res.status} - ${errorText}`);
    }
  
    const json: ApiResponse<ShowtimeDetailResponse> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
    return json.data;
  }
  
  export async function deleteShowtime(id: string): Promise<void> {
    const url = `${API_BACKEND_URL}/admin/showtimes/soft-delete/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete showtime: ${res.status} - ${errorText}`);
    }
  
    const json: ApiResponse<void> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
  }
  