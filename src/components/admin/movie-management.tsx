"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { fetchMovies } from "@/lib/api/movies-api"

import { Movie } from "@/types/movie"

export function MovieManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovies();
        setMovies(response);
        setLoading(false);
      } catch (error) {
        console.log("Failed fetch movies");
        setLoading(true);
        setMovies([])
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý phim</h1>
        <Button onClick={() => setShowAddForm(true)} className="bg-red-500 hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm phim mới
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Thêm phim mới</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Tên phim</Label>
                  <Input id="title" placeholder="Nhập tên phim" />
                </div>
                <div>
                  <Label htmlFor="genre">Thể loại</Label>
                  <Input id="genre" placeholder="Nhập thể loại" />
                </div>
                <div>
                  <Label htmlFor="duration">Thời lượng (phút)</Label>
                  <Input id="duration" type="number" placeholder="110" />
                </div>
                <div>
                  <Label htmlFor="rating">Phân loại</Label>
                  <select id="rating" className="w-full px-3 py-2 border rounded-md">
                    <option value="P">P - Phù hợp mọi lứa tuổi</option>
                    <option value="T13">T13 - Từ 13 tuổi trở lên</option>
                    <option value="T16">T16 - Từ 16 tuổi trở lên</option>
                    <option value="T18">T18 - Từ 18 tuổi trở lên</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="releaseDate">Ngày khởi chiếu</Label>
                  <Input id="releaseDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="director">Đạo diễn</Label>
                  <Input id="director" placeholder="Nhập tên đạo diễn" />
                </div>
                <div>
                  <Label htmlFor="cast">Diễn viên</Label>
                  <Input id="cast" placeholder="Nhập tên diễn viên" />
                </div>
                <div>
                  <Label htmlFor="poster">URL Poster</Label>
                  <Input id="poster" placeholder="https://example.com/poster.jpg" />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea id="description" placeholder="Nhập mô tả phim" rows={3} />
              </div>
              <div className="md:col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Hủy
                </Button>
                <Button className="bg-red-500 hover:bg-red-600">Thêm phim</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách phim</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Tìm kiếm phim..." className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Đang tải dữ liệu phim...</p>
          ) : error ? (
            <p className="text-red-500">Lỗi: {error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Tên phim</th>
                    <th className="text-left p-3">Thể loại</th>
                    <th className="text-left p-3">Thời lượng</th>
                    <th className="text-left p-3">Đánh giá</th>
                    <th className="text-left p-3">Ngày khởi chiếu</th>
                    <th className="text-left p-3">Trạng thái</th>
                    <th className="text-left p-3">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie: Movie) => (
                    <tr key={movie.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{movie.title}</td>
                      <td className="p-3">{movie.genres.join(", ")}</td>
                      <td className="p-3">{movie.duration} phút</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{movie.rating}</span>
                      </td>
                      <td className="p-3">{movie.releaseDate}</td>
                      <td className="p-3">
                        {(() => {
                          const statusMap: Record<string, { text: string; color: string }> = {
                            "Đang chiếu": { text: "Đang chiếu", color: "bg-green-100 text-green-800" },
                            "Sắp chiếu": { text: "Sắp chiếu", color: "bg-yellow-100 text-yellow-800" },
                            "Dừng chiếu": { text: "Dừng chiếu", color: "bg-red-100 text-red-800" },
                          };

                          const status = movie.status;
                          const style = statusMap[status] || { text: status, color: "bg-gray-100 text-gray-800" };

                          return (
                            <span className={`px-2 py-1 rounded-full text-xs ${style.color}`}>
                              {style.text}
                            </span>
                          );
                        })()}
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
