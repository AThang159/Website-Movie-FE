import { UserResponse } from './user-response';
import { TicketResponse } from './ticket-response'   
import { ShowtimeResponse } from './showtime-response';

export interface BookingDetailResponse{
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
    tickets: TicketResponse[]
    showtime: ShowtimeResponse
}