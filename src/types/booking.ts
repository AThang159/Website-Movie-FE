import { User } from './user';
import { Ticket } from './ticket'   
import { Showtime } from './showtime';

export interface Booking{
    id: string,
    bookingCode: string,
    user?: User,
    customerPhone: string,
    customerFullName: string,
    customerEmail: string,
    bookingTime: string,
    totalPrice: number,
    serviceFee: number,
    amount: number,
    paymentMethod: string,
    showtime: Showtime
}