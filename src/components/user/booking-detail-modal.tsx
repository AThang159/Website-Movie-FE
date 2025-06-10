"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatPrice } from "@/lib/utils"
import Barcode from 'react-barcode'
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { BookingDetailResponse } from "@/types/booking-detail-response"
import { fetchBooking } from "@/lib/api/backend/user/booking-api"

interface BookingDetailModalProps {
  bookingCode: string | null
  isOpen: boolean
  onClose: () => void
}

export function BookingDetailModal({ bookingCode, isOpen, onClose }: BookingDetailModalProps) {
  if (!bookingCode) return null

  const [booking, setBooking] = useState<BookingDetailResponse | null>(null)

  useEffect(() => {
    const fetchBookingData = async () => {
        try {
            const booking = await fetchBooking(bookingCode)
            console.log(booking)
            setBooking(booking)
        } catch (error) {
            console.error("Failed to fetch booking", error)
            setBooking(null)
        }
    }
    fetchBookingData()
  }, [bookingCode])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="space-y-6">
          {/* Booking Code */}
          <div className="border-b pb-4">
            <div className="text-sm text-gray-500">Mã đặt vé</div>
            <div className="text-xl font-bold">{booking?.bookingCode}</div>
          </div>

          {/* Movie Info */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">{booking?.showtime.movie.title}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Rạp chiếu</div>
                <div>{booking?.showtime.theater?.name}</div>
              </div>
              <div>
                <div className="text-gray-500">Phòng chiếu</div>
                <div>{booking?.showtime.room?.name}</div>
              </div>
              <div>
                <div className="text-gray-500">Suất chiếu</div>
                <div>{booking?.showtime.startTime} {booking?.showtime.showDate}</div>
              </div>
              <div>
                <div className="text-gray-500">Ghế</div>
                <div>
                  {booking?.tickets.map(ticket => ticket.seat.seatCode).join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Vé ({booking?.tickets.length}x)</span>
              <span>{formatPrice(booking?.totalPrice ?? 0)} đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Phí dịch vụ</span>
              <span>{formatPrice(booking?.serviceFee ?? 0)} đ</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
              <span>Tổng cộng</span>
              <span className="text-red-500">{formatPrice(booking?.amount ?? 0)} đ</span>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <p className="text-blue-800">📱 Vui lòng xuất trình mã vạch hoặc mã đặt vé tại quầy để nhận vé.</p>
          </div>

          {/* Barcode */}
          <div className="flex justify-center">
            <div className="w-64 h-24 bg-white-100 flex items-center justify-center p-2 rounded shadow">
              <Barcode value={booking?.bookingCode?.toString() ?? ""} format="CODE128" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 