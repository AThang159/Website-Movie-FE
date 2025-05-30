import { Seat } from './seat';

export interface SeatStatus{
    id: number
    showtimeId: string
    seat: Seat
    bookingDetailId: number | null
}