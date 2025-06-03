import { Booking } from "@/types/booking";
import { BookingDetail } from "@/types/booking-detail";

export async function fetchBooking(bookingCode: string): Promise<BookingDetail> {
  const res = await fetch(`http://localhost:8080/api/bookings/${bookingCode}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}