"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Edit, Save, X } from "lucide-react"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    fullName: "Nguyễn Văn A",
    email: "user@moveek.com",
    phone: "0123 456 789",
    joinDate: "15/01/2024",
    totalBookings: 12,
    totalSpent: 1440000,
  })
  const [editData, setEditData] = useState(userData)

  useEffect(() => {
    // Load user data from localStorage or API
    const userName = localStorage.getItem("userName")
    if (userName) {
      setUserData((prev) => ({ ...prev, fullName: userName }))
      setEditData((prev) => ({ ...prev, fullName: userName }))
    }
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(userData)
  }

  const handleSave = () => {
    setUserData(editData)
    setIsEditing(false)
    // Save to API here
  }

  const handleCancel = () => {
    setEditData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Info */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Thông tin cá nhân
            </CardTitle>
            {!isEditing ? (
              <Button onClick={handleEdit} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600">
                  <Save className="w-4 h-4 mr-2" />
                  Lưu
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Hủy
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Họ và tên</Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  name="fullName"
                  value={editData.fullName}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded">{userData.fullName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded">{userData.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              {isEditing ? (
                <Input id="phone" name="phone" value={editData.phone} onChange={handleInputChange} className="mt-1" />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded">{userData.phone}</p>
              )}
            </div>
            <div>
              <Label>Ngày tham gia</Label>
              <p className="mt-1 p-2 bg-gray-50 rounded">{userData.joinDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{userData.totalBookings}</div>
            <p className="text-gray-600">Tổng số lần đặt vé</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{formatPrice(userData.totalSpent)} đ</div>
            <p className="text-gray-600">Tổng chi tiêu</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử đặt vé gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                movie: "Doraemon Movie 44",
                date: "30/05/2025",
                time: "08:00",
                cinema: "Beta Trần Quang Khải",
                seats: "H7, H8",
                amount: 190000,
              },
              {
                movie: "Spider-Man: No Way Home",
                date: "28/05/2025",
                time: "14:30",
                cinema: "CGV Vincom",
                seats: "A5, A6",
                amount: 240000,
              },
              {
                movie: "Avatar: The Way of Water",
                date: "25/05/2025",
                time: "19:00",
                cinema: "Lotte Cinema",
                seats: "C10",
                amount: 130000,
              },
            ].map((booking, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.movie}</p>
                  <p className="text-sm text-gray-600">
                    {booking.date} - {booking.time} | {booking.cinema}
                  </p>
                  <p className="text-sm text-gray-600">Ghế: {booking.seats}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(booking.amount)} đ</p>
                  <Button size="sm" variant="outline" className="mt-1">
                    Chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
