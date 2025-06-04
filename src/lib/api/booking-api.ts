import { Booking } from "@/types/booking";
import { BookingDetail } from "@/types/booking-detail";
import { API_BASE_URL } from "./config";

export async function fetchBooking(bookingCode: string): Promise<BookingDetail> {
  const res = await fetch(`${API_BASE_URL}/bookings/${bookingCode}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_BASE_URL}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}