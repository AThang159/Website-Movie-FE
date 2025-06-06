"use client"

import { useEffect, useState } from "react"
import { Clock, Star } from "lucide-react"
import { Movie } from "@/types/movie"
import { fetchMovie } from "@/lib/api/movies-api"

interface MovieDetailsProps {
  movieId: string
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function fetchData() {
      try {
        const movieData = await fetchMovie(movieId)
        setMovie(movieData)
      } catch (error) {
        console.error("Failed to fetch movie", error)
        setError("Không thể tải thông tin phim")
      }
    }

    if (movieId) fetchData()
  }, [movieId])

  if (error) return <p className="text-red-500">{error}</p>
  if (!movie) return <p>Đang tải phim...</p>

  return (
    <>
      <div className="relative h-[300px] w-full bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('/placeholder.svg?height=300&width=1200')`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
          <h1 className="text-3xl font-bold mb-1">{movie.title}</h1>
          <p className="text-sm text-gray-300 mb-1">{movie.englishTitle}</p>
          <p className="text-sm text-gray-300 mb-3">{movie.genres.join(", ")}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{movie.duration} phút</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              <span className="text-sm">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 text-sm">
            <a
              href="#"
              className="border-b-2 border-transparent py-4 text-gray-500 hover:text-gray-900"
            >
              Thông tin phim
            </a>
            <a
              href="#"
              className="border-b-2 border-red-500 py-4 text-red-500 font-medium"
            >
              Lịch chiếu
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent py-4 text-gray-500 hover:text-gray-900"
            >
              Đánh giá
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent py-4 text-gray-500 hover:text-gray-900"
            >
              Tin tức
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent py-4 text-gray-500 hover:text-gray-900"
            >
              Mua vé
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
