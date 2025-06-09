
export interface BookingRequest{
    userId?: string,
    customerPhone: string,
    customerFullName: string,
    customerEmail: string,
    seatSelectedIds: number[],
    totalPrice: number,
    serviceFee: number,
    amount: number,
    paymentMethod: string,
    showtimeId: string
}