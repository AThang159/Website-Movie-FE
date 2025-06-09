"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { ShowtimeResponse } from "@/types/showtime-response"
import { fetchShowtimes, deleteShowtime } from "@/lib/api/backend/admin/showtime-api"
import { toast } from "sonner"
import { ShowtimeForm } from "./showtime-form"

type ViewMode = "list" | "add" | "edit"

const ITEMS_PER_PAGE = 5

export function ShowtimeManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedShowtime, setSelectedShowtime] = useState<ShowtimeResponse | undefined>()
  const [showtimes, setShowtimes] = useState<ShowtimeResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchDate, setSearchDate] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (viewMode === "list") {
      fetchShowtimes()
        .then((data) => setShowtimes(data))
        .catch((err) => {
          console.error("Error:", err)
          setError("Không thể tải danh sách suất chiếu")
        })
        .finally(() => setLoading(false))
    }
  }, [viewMode, refreshKey])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchDate, searchQuery])

  const handleAddClick = () => {
    setSelectedShowtime(undefined)
    setViewMode("add")
  }

  const handleEditClick = (showtime: ShowtimeResponse) => {
    setSelectedShowtime(showtime)
    setViewMode("edit")
  }

  const handleDeleteShowtime = async (showtimeId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa suất chiếu này?")) return

    try {
      await deleteShowtime(showtimeId)
      toast.success("Xóa suất chiếu thành công")
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error("Error deleting showtime:", error)
      toast.error("Có lỗi xảy ra khi xóa suất chiếu")
    }
  }

  const handleFormSuccess = () => {
    setViewMode("list")
    setRefreshKey(prev => prev + 1)
  }

  const handleFormCancel = () => {
    setViewMode("list")
    setSelectedShowtime(undefined)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  const filteredShowtimes = showtimes.filter((showtime) => {
    const matchesDate = !searchDate || showtime.showDate === searchDate
    const matchesSearch = !searchQuery || 
      showtime.movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      showtime.theater?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      showtime.room?.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDate && matchesSearch
  })

  const totalPages = Math.ceil(filteredShowtimes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedShowtimes = filteredShowtimes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  if (viewMode === "add" || viewMode === "edit") {
    return (
      <ShowtimeForm
        showtime={selectedShowtime}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý suất chiếu</h1>
        <Button onClick={handleAddClick} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm suất chiếu
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách suất chiếu</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="date"
                  className="pl-10 w-40"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                  <th className="text-left p-3">Trạng thái</th>
                  <th className="text-left p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedShowtimes.map((showtime) => {
                  const hasBookedSeats = showtime.seatsTotal - showtime.seatsAvailable > 0;
                  return (
                    <tr key={showtime.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{showtime.movie.title}</td>
                      <td className="p-3">{showtime.theater?.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{showtime.room?.name}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {showtime.showDate}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-400" />
                          {showtime.startTime}
                        </div>
                      </td>
                      <td className="p-3 font-medium">{formatPrice(showtime.price)} đ</td>
                      <td className="p-3">
                        <div className="text-center">
                          <span className="font-medium">{showtime.seatsAvailable}</span>
                          <span className="text-gray-500">/{showtime.seatsTotal}</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(showtime.seatsAvailable / showtime.seatsTotal) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          // console.log(showtime.status),
                          showtime.status === "SCHEDULED" 
                            ? "bg-green-100 text-green-800"
                            : showtime.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {showtime.status === "SCHEDULED" 
                            ? "Đã được lên lịch"
                            : showtime.status === "CANCELLED"
                            ? "Đã hủy"
                            : "Lỗi"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditClick(showtime)}
                            disabled={hasBookedSeats}
                            title={hasBookedSeats ? "Không thể sửa khi đã có đặt chỗ" : ""}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteShowtime(showtime.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredShowtimes.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Hiển thị {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredShowtimes.length)} trong tổng số {filteredShowtimes.length} suất chiếu
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm">
                    Trang {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {filteredShowtimes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không tìm thấy suất chiếu nào
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
