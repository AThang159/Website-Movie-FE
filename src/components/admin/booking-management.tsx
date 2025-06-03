"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Download, Calendar, Clock } from "lucide-react"

export function BookingManagement() {
  const [bookings] = useState([
    {
      id: "BK001",
      customerName: "Nguyễn Văn A",
      movie: "Doraemon Movie 44",
      cinema: "Beta Trần Quang Khải",
      screen: "P4",
      date: "2025-05-30",
      time: "08:00",
      seats: ["A1", "A2"],
      totalAmount: 200000,
      status: "Đã thanh toán",
      bookingDate: "2025-05-28 14:30",
    },
    {
      id: "BK002",
      customerName: "Trần Thị B",
      movie: "Spider-Man: No Way Home",
      cinema: "CGV Vincom Center",
      screen: "P1",
      date: "2025-05-30",
      time: "10:30",
      seats: ["B5", "B6", "B7"],
      totalAmount: 360000,
      status: "Đã thanh toán",
      bookingDate: "2025-05-29 09:15",
    },
    {
      id: "BK003",
      customerName: "Lê Văn C",
      movie: "Avatar: The Way of Water",
      cinema: "Lotte Cinema Diamond",
      screen: "P2",
      date: "2025-05-30",
      time: "14:00",
      seats: ["C10"],
      totalAmount: 130000,
      status: "Chờ thanh toán",
      bookingDate: "2025-05-29 16:45",
    },
  ])

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
                  <th className="text-left p-3">Ghế</th>
                  <th className="text-left p-3">Tổng tiền</th>
                  <th className="text-left p-3">Trạng thái</th>
                  <th className="text-left p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.id}</p>
                        <p className="text-xs text-gray-500">{booking.bookingDate}</p>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{booking.customerName}</td>
                    <td className="p-3">{booking.movie}</td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm">{booking.cinema}</p>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{booking.screen}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {booking.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          {booking.time}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {booking.seats.map((seat) => (
                          <span key={seat} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 font-medium">{formatPrice(booking.totalAmount)} đ</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === "Đã thanh toán"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
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
