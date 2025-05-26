"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Search, HelpCircle, User } from "lucide-react"

interface MovieBookingProps {
  showtimeId: string;
}

export default function MovieBooking({ showtimeId }: MovieBookingProps) {

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const seatRows = ["A", "B", "C", "D", "E"]
  const seatsPerRow = 16

  // Mock data for seat availability
  const unavailableSeats = ["A5", "A6", "B8", "B9", "C10", "D3", "D4", "E12"]
  const vipSeats = [
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "C11",
    "C12",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D10",
    "D11",
    "D12",
  ]

  const toggleSeat = (seatId: string) => {
    if (unavailableSeats.includes(seatId)) return

    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]))
  }

  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.includes(seatId)) return "selected"
    if (unavailableSeats.includes(seatId)) return "unavailable"
    if (vipSeats.includes(seatId)) return "vip"
    return "available"
  }

  const getSeatColor = (status: string) => {
    switch (status) {
      case "selected":
        return "bg-green-500 hover:bg-green-600"
      case "unavailable":
        return "bg-gray-400 cursor-not-allowed"
      case "vip":
        return "bg-yellow-400 hover:bg-yellow-500"
      default:
        return "bg-gray-200 hover:bg-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Booking Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white mb-2">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <span className="text-sm text-red-600 font-medium">Chọn ghế</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
              </div>
              <span className="text-sm text-gray-500">Thanh toán</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
              </div>
              <span className="text-sm text-gray-500">Thông tin vé</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Ghế bạn chọn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span className="text-sm">Không thể chọn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-sm">Đã bán</span>
                  </div>
                </div>

                {/* Screen */}
                <div className="text-center mb-8">
                  <div className="bg-gray-800 text-white py-3 px-8 rounded-lg inline-block">MÀN HÌNH</div>
                </div>

                {/* Seating Chart */}
                <div className="space-y-3">
                  {seatRows.map((row) => (
                    <div key={row} className="flex items-center justify-center space-x-2">
                      <div className="w-8 text-center font-medium text-gray-600">{row}</div>
                      <div className="flex space-x-1">
                        {Array.from({ length: seatsPerRow }, (_, i) => {
                          const seatNumber = i + 1
                          const seatId = `${row}${seatNumber}`
                          const status = getSeatStatus(seatId)

                          return (
                            <button
                              key={seatId}
                              onClick={() => toggleSeat(seatId)}
                              className={`w-6 h-6 rounded text-xs font-medium transition-colors ${getSeatColor(status)}`}
                              disabled={status === "unavailable"}
                            >
                              {seatNumber}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat Types */}
                <div className="flex items-center justify-center space-x-8 mt-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-sm">Standard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-sm">VIP</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Movie Info & Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Doraemon Movie 44: Nobita Và Cuộc Phiêu Lưu Ở Vùng Đất Mới</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    Suất <span className="font-medium">15:00 26/05/2025</span>
                  </div>
                  <div>
                    Phòng chiếu <span className="font-medium">P2 - Ghế ...</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">TỔNG ĐƠN HÀNG</div>
                  <div className="text-3xl font-bold">0 đ</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
              <Button className="flex-1 bg-gray-600 hover:bg-gray-700">Tiếp tục</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
