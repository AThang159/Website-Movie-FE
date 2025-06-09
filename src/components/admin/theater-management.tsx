"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { TheaterResponse } from "@/types/theater-response"
import { TheaterRequest } from "@/types/theater-request"
import { fetchTheaters, addTheater} from "@/lib/api/backend/admin/theater-api"
import { toast } from "sonner"
import { TheaterForm } from "./theater-form"

type ViewMode = "list" | "add" | "edit"

const ITEMS_PER_PAGE = 6

export function TheaterManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedTheater, setSelectedTheater] = useState<TheaterResponse | undefined>()
  const [theaters, setTheaters] = useState<TheaterResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (viewMode === "list") {
      fetchTheaters()
        .then((data) => setTheaters(data))
        .catch((err) => {
          console.error("Error:", err)
          setError("Không thể tải danh sách rạp chiếu")
        })
        .finally(() => setLoading(false))
    }
  }, [viewMode, refreshKey])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleAddClick = () => {
    setSelectedTheater(undefined)
    setViewMode("add")
  }

  const handleEditClick = (theater: TheaterResponse) => {
    setSelectedTheater(theater)
    setViewMode("edit")
  }

  const handleDeleteTheater = async (theaterId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa rạp chiếu này?")) return

    try {
      // await deleteTheater(theaterId)
      toast.success("Xóa rạp chiếu thành công")
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error("Error deleting theater:", error)
      toast.error("Có lỗi xảy ra khi xóa rạp chiếu")
    }
  }

  const handleFormSuccess = () => {
    setViewMode("list")
    setRefreshKey(prev => prev + 1)
  }

  const handleFormCancel = () => {
    setViewMode("list")
    setSelectedTheater(undefined)
  }

  const filteredTheaters = theaters.filter((theater) => {
    return !searchQuery || 
      theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theater.address.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const totalPages = Math.ceil(filteredTheaters.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTheaters = filteredTheaters.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  if (viewMode === "add" || viewMode === "edit") {
    return (
      <TheaterForm
        theater={selectedTheater}
        onSubmit={async (data: TheaterRequest) => {
          try {
            if (selectedTheater) {
              // await updateTheater(selectedTheater.id, data)
            } else {
              await addTheater(data)
            }
            handleFormSuccess()
          } catch (error) {
            console.error("Error submitting theater:", error)
            toast.error(`Có lỗi xảy ra khi ${selectedTheater ? 'cập nhật' : 'thêm'} rạp chiếu`)
          }
        }}
        onCancel={handleFormCancel}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý rạp chiếu</h1>
        <Button onClick={handleAddClick} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm rạp mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách rạp chiếu</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Tìm kiếm rạp..." 
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedTheaters.map((theater) => (
                  <Card key={theater.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{theater.name}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              theater.status === "Hoạt động"
                                ? "bg-green-100 text-green-800"
                                : theater.status === "Bảo trì"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {theater.status}
                          </span>
                        </div>

                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{theater.address}</span>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditClick(theater)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteTheater(theater.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTheaters.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Hiển thị {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTheaters.length)} trong tổng số {filteredTheaters.length} rạp
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

              {filteredTheaters.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Không tìm thấy rạp chiếu nào
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
