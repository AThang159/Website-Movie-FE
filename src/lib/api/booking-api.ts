import { Booking } from "@/types/booking";
import { BookingDetail } from "@/types/booking-detail";
import { API_BACKEND_URL } from "./config";
import { ApiResponse } from "@/types/api-response";


export async function fetchBooking(bookingCode: string): Promise<BookingDetail> {
  const res = await fetch(`${API_BACKEND_URL}/bookings/${bookingCode}`);
  if (!res.ok) throw new Error("Failed to fetch booking");

  const json: ApiResponse<BookingDetail> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);

  if (typeof json.data !== "object" || json.data === null) {
    throw new Error("Invalid data format");
  }

  return json.data;
}

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_BACKEND_URL}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");

  const json: ApiResponse<Booking[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);

  if (!Array.isArray(json.data)) {
    throw new Error("Invalid data format");
  }

  return json.data;
}
