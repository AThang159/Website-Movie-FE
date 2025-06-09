import { BookingDetailResponse } from "@/types/booking-detail-response";
import { API_BACKEND_URL } from "./config";
import { ApiResponse } from "@/types/api-response";


export async function fetchBooking(bookingCode: string): Promise<BookingDetailResponse> {
  const res = await fetch(`${API_BACKEND_URL}/bookings/${bookingCode}`);
  if (!res.ok) throw new Error("Failed to fetch booking");

  const json: ApiResponse<BookingDetailResponse> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);

  if (typeof json.data !== "object" || json.data === null) {
    throw new Error("Invalid data format");
  }

  return json.data;
}

