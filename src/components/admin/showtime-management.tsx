"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search, Calendar, Clock } from "lucide-react"

export function ShowtimeManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showtimes] = useState([
    {
      id: 1,
      movie: "Doraemon Movie 44",
      cinema: "Beta Trần Quang Khải",
      screen: "P4",
      date: "2025-05-30",
      time: "08:00",
      price: 95000,
      availableSeats: 75,
      totalSeats: 120,
    },
    {
      id: 2,
      movie: "Spider-Man: No Way Home",
      cinema: "CGV Vincom Center",
      screen: "P1",
      date: "2025-05-30",
      time: "10:30",
      price: 120000,
      availableSeats: 61,
      totalSeats: 150,
    },
    {
      id: 3,
      movie: "Avatar: The Way of Water",
      cinema: "Lotte Cinema Diamond",
      screen: "P2",
      date: "2025-05-30",
      time: "14:00",
      price: 130000,
      availableSeats: 60,
      totalSeats: 180,
    },
  ])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý suất chiếu</h1>
        <Button onClick={() => setShowAddForm(true)} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm suất chiếu
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Thêm suất chiếu mới</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="movie-select">Chọn phim</Label>
                  <select id="movie-select" className="w-full px-3 py-2 border rounded-md">
                    <option value="">Chọn phim</option>
                    <option value="1">Doraemon Movie 44</option>
                    <option value="2">Spider-Man: No Way Home</option>
                    <option value="3">Avatar: The Way of Water</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="cinema-select">Chọn rạp</Label>
                  <select id="cinema-select" className="w-full px-3 py-2 border rounded-md">
                    <option value="">Chọn rạp</option>
                    <option value="1">Beta Trần Quang Khải</option>
                    <option value="2">CGV Vincom Center</option>
                    <option value="3">Lotte Cinema Diamond</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="screen-select">Phòng chiếu</Label>
                  <select id="screen-select" className="w-full px-3 py-2 border rounded-md">
                    <option value="">Chọn phòng</option>
                    <option value="P1">Phòng P1</option>
                    <option value="P2">Phòng P2</option>
                    <option value="P3">Phòng P3</option>
                    <option value="P4">Phòng P4</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="showtime-date">Ngày chiếu</Label>
                  <Input id="showtime-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="showtime-time">Giờ chiếu</Label>
                  <Input id="showtime-time" type="time" />
                </div>
                <div>
                  <Label htmlFor="ticket-price">Giá vé (VNĐ)</Label>
                  <Input id="ticket-price" type="number" placeholder="95000" />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Hủy
                </Button>
                <Button className="bg-red-500 hover:bg-red-600">Thêm suất chiếu</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách suất chiếu</CardTitle>
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
                  <th className="text-left p-3">Phim</th>
                  <th className="text-left p-3">Rạp</th>
                  <th className="text-left p-3">Phòng</th>
                  <th className="text-left p-3">Ngày</th>
                  <th className="text-left p-3">Giờ</th>
                  <th className="text-left p-3">Giá vé</th>
                  <th className="text-left p-3">Ghế trống</th>
                  <th className="text-left p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {showtimes.map((showtime) => (
                  <tr key={showtime.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{showtime.movie}</td>
                    <td className="p-3">{showtime.cinema}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{showtime.screen}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {showtime.date}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {showtime.time}
                      </div>
                    </td>
                    <td className="p-3 font-medium">{formatPrice(showtime.price)} đ</td>
                    <td className="p-3">
                      <div className="text-center">
                        <span className="font-medium">{showtime.availableSeats}</span>
                        <span className="text-gray-500">/{showtime.totalSeats}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(showtime.availableSeats / showtime.totalSeats) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
