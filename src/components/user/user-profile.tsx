"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Edit, Save, X, ChevronLeft, ChevronRight, Lock, Eye, EyeOff, Info } from "lucide-react"
import { UserResponse } from "@/types/user-response"
import { BookingResponse } from "@/types/booking-response"
import { fetchUserBookings } from "@/lib/api/backend/user/booking-api"
import { BookingDetailModal } from "./booking-detail-modal"

interface UserProfileProps {
  user: UserResponse
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [passwordError, setPasswordError] = useState("")
  const itemsPerPage = 5
  const [userData, setUserData] = useState({
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
  })
  const [editData, setEditData] = useState(userData)
  const [bookings, setBookings] = useState<BookingResponse[]>([])
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await fetchUserBookings()
      setBookings(bookings)
    }
    fetchBookings()
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

  const handleViewDetails = (booking: BookingResponse) => {
    setSelectedBooking(booking)
    setIsDetailModalOpen(true)
  }

  // Pagination logic
  const totalPages = Math.ceil(bookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBookings = bookings.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Thông tin cá nhân</CardTitle>
            {!isEditing ? (
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Họ và tên</Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  name="fullName"
                  value={editData.fullName}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-sm text-gray-600">{userData.fullName}</p>
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
                />
              ) : (
                <p className="text-sm text-gray-600">{userData.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-sm text-gray-600">{userData.phone}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle>Đổi mật khẩu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() =>
                    setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                  }
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() =>
                    setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                  }
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() =>
                    setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                  }
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
            <Button
              className="w-full"
              onClick={() => {
                // Handle password change
                if (!passwordData.currentPassword) {
                  setPasswordError("Vui lòng nhập mật khẩu hiện tại")
                  return
                }
                if (!passwordData.newPassword) {
                  setPasswordError("Vui lòng nhập mật khẩu mới")
                  return
                }
                if (passwordData.newPassword.length < 6) {
                  setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự")
                  return
                }
                if (passwordData.newPassword !== passwordData.confirmPassword) {
                  setPasswordError("Mật khẩu xác nhận không khớp")
                  return
                }
                // Call API to change password
                setPasswordError("")
                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                })
              }}
            >
              Đổi mật khẩu
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử đặt vé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentBookings.map((booking, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.showtime.movie.title}</p>
                    <p className="text-sm text-gray-600">
                      {booking.showtime.showDate} - {booking.showtime.startTime} | {booking.showtime.room?.name}
                    </p>
                    <p className="text-sm text-gray-600">Tổng tiền {formatPrice(booking.totalPrice)} đ</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleViewDetails(booking)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {bookings.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Trang trước
                </Button>
                <span className="text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Trang sau
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        bookingCode={selectedBooking?.bookingCode ?? null}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  )
}
