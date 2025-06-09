import { Format } from "./format"

export interface ShowtimeRequest {
    movieCode: string | null
    theaterId: number | null
    roomId: number | null
    showDate: string
    startTime: string
    language: string
    price: number
    status: string
  }