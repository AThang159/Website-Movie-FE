"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { addMovie, fetchMovies, deleteMovie, updateMovie } from "@/lib/api/backend/admin/movie-api"
import { toast } from "sonner"
import { MovieRequest } from "@/types/movie-request"
import { MovieResponse } from "@/types/movie-response"
import { MovieForm } from "./movie-form"

type ViewMode = "list" | "add" | "edit"

const ITEMS_PER_PAGE = 5

export function MovieManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedMovie, setSelectedMovie] = useState<MovieResponse | undefined>()
  const [movies, setMovies] = useState<MovieResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (viewMode === "list") {
      fetchMovies()
        .then((data) => setMovies(data))
        .catch((err) => {
          console.error("Error:", err)
          setError("Không thể tải danh sách phim")
        })
        .finally(() => setLoading(false))
    }
  }, [viewMode, refreshKey])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleAddClick = () => {
    setSelectedMovie(undefined)
    setViewMode("add")
  }

  const handleEditClick = (movie: MovieResponse) => {
    setSelectedMovie(movie)
    setViewMode("edit")
  }

  const handleDeleteMovie = async (movieCode: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa phim này?")) return

    try {
      await deleteMovie(movieCode)
      toast.success("Xóa phim thành công")
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error("Error deleting movie:", error)
      toast.error("Có lỗi xảy ra khi xóa phim")
    }
  }

  const handleFormSuccess = () => {
    setViewMode("list")
    setRefreshKey(prev => prev + 1)
  }

  const handleFormCancel = () => {
    setViewMode("list")
    setSelectedMovie(undefined)
  }

  const filteredMovies = movies.filter((movie) => {
    return !searchQuery || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  if (viewMode === "add" || viewMode === "edit") {
    return (
      <MovieForm
        movie={selectedMovie}
        onSubmit={async (data) => {
          try {
            if (selectedMovie) {
              await updateMovie(selectedMovie.movieCode, data)
            } else {
              console.log(data)
              await addMovie(data)
            }
            handleFormSuccess()
          } catch (error) {
            console.error("Error submitting movie:", error)
            toast.error(`Có lỗi xảy ra khi ${selectedMovie ? 'cập nhật' : 'thêm'} phim`)
          }
        }}
        onCancel={handleFormCancel}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý phim</h1>
        <Button onClick={handleAddClick} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm phim
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách phim</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm phim..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Poster</th>
                  <th className="text-left p-3">Tên phim</th>
                  <th className="text-left p-3">Tên tiếng Anh</th>
                  <th className="text-left p-3">Thể loại</th>
                  <th className="text-left p-3">Thời lượng</th>
                  <th className="text-left p-3">Ngày khởi chiếu</th>
                  <th className="text-left p-3">Trạng thái</th>
                  <th className="text-left p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMovies.map((movie) => (
                  <tr key={movie.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 font-medium">{movie.title}</td>
                    <td className="p-3">{movie.englishTitle}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {movie.genres.map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{movie.duration} phút</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {movie.releaseDate}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          movie.status === "NOW_SHOWING"
                            ? "bg-green-100 text-green-800"
                            : movie.status === "COMING_SOON"
                            ? "bg-blue-100 text-blue-800"
                            : movie.status === "STOPPED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {movie.status === "NOW_SHOWING"
                          ? "Đang chiếu"
                          : movie.status === "COMING_SOON"
                          ? "Sắp chiếu"
                          : movie.status === "STOPPED"
                          ? "Đã kết thúc"
                          : "Lỗi"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(movie)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteMovie(movie.movieCode)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMovies.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Hiển thị {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredMovies.length)} trong tổng số {filteredMovies.length} phim
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

            {filteredMovies.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không tìm thấy phim nào
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
