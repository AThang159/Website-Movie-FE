import { BookingResponse } from "@/types/booking-response";
import { API_BACKEND_URL } from "../config";
import { ApiResponse } from "@/types/api-response";
import { BookingDetailResponse } from "@/types/booking-detail-response";

export async function fetchUserBookings(): Promise<BookingResponse[]> {
    const res = await fetch(`${API_BACKEND_URL}/user/bookings/all`, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
    console.log(res)
    if (!res.ok) throw new Error("Failed to fetch bookings");
  
    const json: ApiResponse<BookingResponse[]> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
  
    if (!Array.isArray(json.data)) {
      throw new Error("Invalid data format");
    }
  
    return json.data;
  }

export async function fetchBooking(bookingCode: string): Promise<BookingDetailResponse> {
  const res = await fetch(`${API_BACKEND_URL}/user/bookings/${bookingCode}`, {
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
  });
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch booking");

  const json: ApiResponse<BookingDetailResponse> = await res.json();
  console.log(json)
  if (!json.success) throw new Error(`API error: ${json.message}`); 

  return json.data;
}