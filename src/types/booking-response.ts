import { UserResponse } from './user-response';
import { ShowtimeResponse } from './showtime-response';

export interface BookingResponse{
    id: number,
    bookingCode: string,
    user?: UserResponse,
    customerPhone: string,
    customerFullName: string,
    customerEmail: string,
    bookingTime: string,
    totalPrice: number,
    serviceFee: number,
    amount: number,
    paymentMethod: string,
    ticketTotal: number,
    showtime: ShowtimeResponse
}