import { SeatResponse } from "./seat-response";

export interface TicketResponse{
    id: number;
    seat: SeatResponse;
}