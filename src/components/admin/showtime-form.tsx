"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MovieResponse } from "@/types/movie-response"
import { TheaterResponse } from "@/types/theater-response"
import { RoomResponse } from "@/types/room-response"
import { ShowtimeResponse } from "@/types/showtime-response"
import { ShowtimeRequest } from "@/types/showtime-request"
import { fetchMovies } from "@/lib/api/backend/admin/movie-api"
import { fetchTheaters } from "@/lib/api/backend/admin/theater-api"
import { fetchRoomsByTheaterId } from "@/lib/api/backend/admin/theater-api"
import { addShowtime, updateShowtime } from "@/lib/api/backend/admin/showtime-api"
import { toast } from "sonner"
import { validateShowtimeForm, ValidationError } from "@/lib/validations/showtime-validation"

interface ShowtimeFormProps {
  showtime?: ShowtimeResponse
  onSuccess?: () => void
  onCancel?: () => void
}

export function ShowtimeForm({ showtime, onSuccess, onCancel }: ShowtimeFormProps) {
  const [movies, setMovies] = useState<MovieResponse[]>([])
  const [theaters, setTheaters] = useState<TheaterResponse[]>([])
  const [rooms, setRooms] = useState<RoomResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [formData, setFormData] = useState<ShowtimeRequest>({
    movieCode: showtime?.movie.movieCode || null,
    theaterId: showtime?.theater?.id || null,
    roomId: showtime?.room?.id || null,
    showDate: showtime?.showDate || "",
    startTime: showtime?.startTime || "",
    language: showtime?.language || "VIETNAMESE",
    price: showtime?.price || 0,
    status: showtime?.status || "Đang chiếu",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [moviesData, theatersData] = await Promise.all([
          fetchMovies(),
          fetchTheaters(),
        ])
        setMovies(moviesData)
        setTheaters(theatersData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast.error("Không thể tải dữ liệu")
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (formData.theaterId) {
      fetchRoomsByTheaterId(formData.theaterId)
        .then(setRooms)
        .catch((error) => {
          console.error("Error loading rooms:", error)
          toast.error("Không thể tải danh sách phòng chiếu")
        })
    } else {
      setRooms([])
    }
  }, [formData.theaterId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validationErrors = validateShowtimeForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      if (showtime) {
        await updateShowtime(showtime.id, formData)
        toast.success("Cập nhật suất chiếu thành công")
      } else {
        await addShowtime(formData)
        toast.success("Thêm suất chiếu thành công")
      }

      onSuccess?.()
    } catch (error) {
      console.error("Error saving showtime:", error)
      toast.error("Có lỗi xảy ra khi lưu suất chiếu")
    } finally {
      setLoading(false)
    }
  }

  const getErrorMessage = (field: keyof ShowtimeRequest) => {
    return errors.find(error => error.field === field)?.message
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{showtime ? "Cập nhật suất chiếu" : "Thêm suất chiếu mới"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="movieId">Phim</Label>
                <Select
                  value={formData.movieCode?.toString() || ""}
                  onValueChange={(value) => setFormData({ ...formData, movieCode: value || null })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phim" />
                  </SelectTrigger>
                  <SelectContent>
                    {movies.map((movie) => (
                      <SelectItem key={movie.movieCode} value={movie.movieCode.toString()}>
                        {movie.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getErrorMessage("movieCode") && (
                  <p className="text-sm text-red-500 mt-1">{getErrorMessage("movieCode")}</p>
                )}
              </div>

              <div>
                <Label htmlFor="theaterId">Rạp chiếu</Label>
                <Select
                  value={formData.theaterId?.toString() || ""}
                  onValueChange={(value) => setFormData({ ...formData, theaterId: Number(value) || null, roomId: null })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn rạp" />
                  </SelectTrigger>
                  <SelectContent>
                    {theaters.map((theater) => (
                      <SelectItem key={theater.id} value={theater.id.toString()}>
                        {theater.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getErrorMessage("theaterId") && (
                  <p className="text-sm text-red-500 mt-1">{getErrorMessage("theaterId")}</p>
                )}
              </div>

              <div>
                <Label htmlFor="roomId">Phòng chiếu</Label>
                <Select
                  value={formData.roomId?.toString() || ""}
                  onValueChange={(value) => setFormData({ ...formData, roomId: Number(value) || null })}
                  disabled={!formData.theaterId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getErrorMessage("roomId") && (
                  <p className="text-sm text-red-500 mt-1">{getErrorMessage("roomId")}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="showDate">Ngày chiếu</Label>
                <Input
                  id="showDate"
                  type="date"
                  value={formData.showDate}
                  onChange={(e) => setFormData({ ...formData, showDate: e.target.value })}
                />
                {getErrorMessage("showDate") && (
                  <p className="text-sm text-red-500 mt-1">{getErrorMessage("showDate")}</p>
                )}
              </div>

              <div>
                <Label htmlFor="startTime">Giờ chiếu</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
                {getErrorMessage("startTime") && (
                  <p className="text-sm text-red-500 mt-1">{getErrorMessage("startTime")}</p>
                )}
              </div>

              <div>
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PHU_DE_VIET">Phụ đề Việt</SelectItem>
                    <SelectItem value="LONG_TIENG_VIET">Lồng tiếng Việt</SelectItem>
                  </SelectContent>
                </Select>
                {getErrorMessage("language") && (
                  <p className="text-sm text-red-500 mt-1">{getErrorMessage("language")}</p>
                )}
              </div>

              <div>
                <Label htmlFor="price">Giá vé (VNĐ)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  min={0}
                />
                {getErrorMessage("price") && (
                  <p className="text-sm text-red-500 mt-1">{getErrorMessage("price")}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {showtime ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 