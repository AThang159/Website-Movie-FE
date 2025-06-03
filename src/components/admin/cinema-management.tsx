"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search, MapPin } from "lucide-react"

export function CinemaManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [cinemas] = useState([
    {
      id: 1,
      name: "Beta Trần Quang Khải",
      address: "123 Trần Quang Khải, Quận 1, TP.HCM",
      phone: "028 1234 5678",
      screens: 8,
      totalSeats: 1200,
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "CGV Vincom Center",
      address: "456 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "028 8765 4321",
      screens: 12,
      totalSeats: 1800,
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Lotte Cinema Diamond",
      address: "789 Lê Duẩn, Quận 1, TP.HCM",
      phone: "028 9999 8888",
      screens: 10,
      totalSeats: 1500,
      status: "Bảo trì",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý rạp chiếu</h1>
        <Button onClick={() => setShowAddForm(true)} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm rạp mới
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Thêm rạp chiếu mới</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cinema-name">Tên rạp</Label>
                  <Input id="cinema-name" placeholder="Nhập tên rạp" />
                </div>
                <div>
                  <Label htmlFor="cinema-phone">Số điện thoại</Label>
                  <Input id="cinema-phone" placeholder="028 1234 5678" />
                </div>
                <div>
                  <Label htmlFor="cinema-screens">Số phòng chiếu</Label>
                  <Input id="cinema-screens" type="number" placeholder="8" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cinema-address">Địa chỉ</Label>
                  <Input id="cinema-address" placeholder="Nhập địa chỉ đầy đủ" />
                </div>
                <div>
                  <Label htmlFor="cinema-email">Email</Label>
                  <Input id="cinema-email" type="email" placeholder="cinema@example.com" />
                </div>
                <div>
                  <Label htmlFor="cinema-seats">Tổng số ghế</Label>
                  <Input id="cinema-seats" type="number" placeholder="1200" />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Hủy
                </Button>
                <Button className="bg-red-500 hover:bg-red-600">Thêm rạp</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách rạp chiếu</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Tìm kiếm rạp..." className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cinemas.map((cinema) => (
              <Card key={cinema.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{cinema.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          cinema.status === "Hoạt động"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {cinema.status}
                      </span>
                    </div>

                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{cinema.address}</span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>📞 {cinema.phone}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Phòng chiếu:</span>
                        <p className="font-medium">{cinema.screens}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Tổng ghế:</span>
                        <p className="font-medium">{cinema.totalSeats}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
