import { BookingResponse } from "@/types/booking-response";
import { API_BACKEND_URL } from "../config";
import { ApiResponse } from "@/types/api-response";

export async function fetchBookings(): Promise<BookingResponse[]> {
    const res = await fetch(`${API_BACKEND_URL}/admin/bookings/all`, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch bookings");
  
    const json: ApiResponse<BookingResponse[]> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
  
    if (!Array.isArray(json.data)) {
      throw new Error("Invalid data format");
    }
  
    return json.data;
  }