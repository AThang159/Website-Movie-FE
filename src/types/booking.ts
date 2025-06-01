import { User } from './user';
import { Ticket } from './ticket'   

export interface Booking{
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
    tickets: Ticket[]
}