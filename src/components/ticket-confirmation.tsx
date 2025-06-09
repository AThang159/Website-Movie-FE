"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Barcode from 'react-barcode';
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

import { SeatResponse } from "@/types/seat-response"

import { fetchBooking } from "@/lib/api/backend/booking-api"
import { fetchShowtime} from "@/lib/api/backend/showtime-api"

import { ShowtimeDetailResponse } from "@/types/showtime-detail-response";
import { BookingDetailResponse } from "@/types/booking-detail-response";

interface TicketConfirmationProps{
  bookingCode: string
}

export function TicketConfirmation({ bookingCode }: TicketConfirmationProps) {

    const [booking, setBooking] = useState<BookingDetailResponse>();
    const [seats, setSeats] = useState<SeatResponse[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [serviceFee, setServiceFee] = useState<number>(0);
    const ticketRef = useRef<HTMLDivElement>(null)

    useEffect(() =>{
      const fetchBookingData = async () => {
        try {
          const response = await fetchBooking(bookingCode);
          console.log(response);
          setBooking(response);
        } catch (error) {
          console.error(error);
          setBooking(undefined);
        }
      }
      fetchBookingData();
    }, []);

    useEffect(() => {
      if (!booking) return;
        const seats = booking.tickets.map(ticket => ticket.seat);
        setSeats(seats)
    }, [booking])

    useEffect(() => {
      if (!booking) return;
      setTotalPrice(booking.totalPrice);
    }, [booking])

    useEffect(() => {
      if (!booking) return;
      setServiceFee(booking.serviceFee);
    }, [booking])
    
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price)
    }

    const downloadTicket = async () => {
      if (!ticketRef.current) return;

      try {
        const canvas = await html2canvas(ticketRef.current, {
          scale: 2,        
          useCORS: true    
        })
        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4"
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        const imgProps = pdf.getImageProperties(imgData)
        const imgRatio = imgProps.width / imgProps.height
        let imgWidth = pdfWidth - 40
        let imgHeight = imgWidth / imgRatio
        if (imgHeight > pdfHeight - 40) {
          imgHeight = pdfHeight - 40
          imgWidth = imgHeight * imgRatio
        }

        pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight)

        pdf.save(`Ve_${bookingCode}.pdf`)
      } catch (error) {
        console.error("Failed to generate PDF", error)
      }
    }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Đặt vé thành công!</h2>
        <p className="text-gray-600 mt-2">Thông tin vé đã được gửi đến email của bạn</p>
      </div>

      <div ref={ticketRef}>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin vé</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-b pb-4">
              <div className="text-sm text-gray-500">Mã đặt vé</div>
              <div className="text-xl font-bold">{bookingCode}</div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">{booking?.showtime?.movie.title}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Rạp chiếu</div>
                  <div>{booking?.showtime?.theater?.name}</div>
                </div>
                <div>
                  <div className="text-gray-500">Phòng chiếu</div>
                  <div>{booking?.showtime?.room?.name}</div>
                </div>
                <div>
                  <div className="text-gray-500">Suất chiếu</div>
                  <div>{booking?.showtime?.startTime} {booking?.showtime?.showDate}</div>
                </div>
                <div>
                  <div className="text-gray-500">Ghế</div>
                  <div>
                    {booking?.tickets.map(ticket => ticket.seat.seatCode).join(', ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Vé ({seats.length}x)</span>
                <span>{formatPrice(totalPrice)} đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí dịch vụ</span>
                <span>{formatPrice(serviceFee)} đ</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
                <span>Tổng cộng</span>
                <span>{formatPrice(totalPrice + serviceFee)} đ</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <p className="text-blue-800">📱 Vui lòng xuất trình mã vạch hoặc mã đặt vé tại quầy để nhận vé.</p>
            </div>

            <div className="flex justify-center">
              <div className="w-64 h-24 bg-white-100 flex items-center justify-center p-2 rounded shadow">
                <Barcode value={bookingCode} format="CODE128" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center mb-8">
        <div className="flex justify-center mt-4">  {/* thêm mt-4 để cách trên */}
          <button
            className="px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={downloadTicket}
          >
            Tải vé
          </button>
        </div>
      </div>
    </div>
  )
}
