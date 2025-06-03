"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Download, Calendar, Clock } from "lucide-react"
import { Booking } from "@/types/booking"
import { fetchBookings } from "@/lib/api/booking-api"

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
        fetchBookings()
          .then((data) => setBookings(data))
          .catch((err) => console.error("Error:", err))
          .finally(() => setLoading(false))
      }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý đặt vé</h1>
        <Button className="bg-green-500 hover:bg-green-600">
          <Download className="w-4 h-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-gray-600">Tổng đặt vé hôm nay</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">142</p>
              <p className="text-sm text-gray-600">Đã thanh toán</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">14</p>
              <p className="text-sm text-gray-600">Chờ thanh toán</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">18.5M</p>
              <p className="text-sm text-gray-600">Doanh thu hôm nay</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách đặt vé</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type="date" className="pl-10 w-40" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Tìm kiếm..." className="pl-10 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Mã đặt vé</th>
                  <th className="text-left p-3">Khách hàng</th>
                  <th className="text-left p-3">Phim</th>
                  <th className="text-left p-3">Rạp & Phòng</th>
                  <th className="text-left p-3">Suất chiếu</th>
                  <th className="text-left p-3">Tổng tiền</th>
                  <th className="text-left p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.bookingCode}</p>
                        <p className="text-xs text-gray-500">{booking.bookingTime}</p>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{booking.customerFullName}</td>
                    <td className="p-3">{booking.showtime.movie.title}</td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm">{booking.showtime.theater?.name}</p>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{booking.showtime.room?.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {booking.showtime.showDate} 
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          {booking.showtime.startTime}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{formatPrice(booking.totalPrice + booking.serviceFee)} đ</td>
                    <td className="p-3">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
