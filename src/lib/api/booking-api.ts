import { Booking } from "@/types/booking";

export async function fetchBooking(bookingCode: string): Promise<Booking> {
  const res = await fetch(`http://localhost:8080/api/bookings/${bookingCode}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}