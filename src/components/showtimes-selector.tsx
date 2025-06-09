"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

import { fetchCities } from "@/lib/api/backend/city-api"
import { fetchTheatersByCityId } from "@/lib/api/backend/theater-api"
import { fetchShowtimesByMovieAndDateAndTheaterId } from "@/lib/api/backend/showtime-api"

import { ShowtimeResponse } from "@/types/showtime-response"
import { TheaterResponse } from "@/types/theater-response"
import { Format } from "@/types/format"
import { City } from "@/types/city"

interface MovieProps {
  movieCode: string
}

export default function ShowtimesSelector({ movieCode }: MovieProps) {
  const dateOptions = useMemo(() => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split("T")[0] // YYYY-MM-DD
      dates.push({
        date: dateString,
        displayDate: formatDate(dateString),
        day: getDayOfWeek(dateString),
      })
    }

    return dates
  }, [])

  const [selectedCityId, setSelectedCityId] = useState<number>(1)
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedTheaterId, setSelectedTheaterId] = useState<number>(0)
  const [expandedTheaterId, setExpandedTheaterId] = useState<number | null>(null)

  const [cities, setCities] = useState<City[]>([])
  const [theaters, setTheaters] = useState<TheaterResponse[]>([])
  const [showtimes, setShowtimes] = useState<ShowtimeResponse[]>([])

  // Load cities + formats
  useEffect(() => {
    async function fetchData() {
      try {
        const citiesData = await fetchCities()
        setCities(citiesData)
      } catch (error) {
        console.error("Failed to fetch cities or formats", error)
      }
    }
    fetchData()
  }, [])

  // Load theaters by selected city
  useEffect(() => {
    async function fetchTheaters() {
      if (!selectedCityId) {
        setTheaters([])
        return
      }

      try {
        const theatersData = await fetchTheatersByCityId(selectedCityId)
        setTheaters(theatersData)
      } catch (error) {
        console.error("Failed to fetch theaters by city", error)
      }
    }
    fetchTheaters()
  }, [selectedCityId])

  // Load showtimes when selectedTheaterId or date changes
  useEffect(() => {
    async function fetchShowtimes() {
      if (!selectedTheaterId) {
        setShowtimes([])
        return
      }

      const date = dateOptions[selectedDateIndex].date

      try {
        const showtimesData = await fetchShowtimesByMovieAndDateAndTheaterId(
          movieCode,
          date,
          selectedTheaterId
        )
        setShowtimes(showtimesData)
      } catch (error) {
        console.error("Failed to fetch showtimes", error)
        setShowtimes([])
      }
    }
    fetchShowtimes()
  }, [selectedTheaterId, selectedDateIndex, movieCode, dateOptions])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-medium text-center mb-6">Lịch chiếu</h2>

      <div className="max-w-3xl mx-auto">
        {/* Chọn Thành phố và Định dạng */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <select
              className="w-full border rounded px-4 py-2.5 appearance-none focus:outline-none focus:ring-1 focus:ring-red-500"
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(Number(e.target.value))}
            >
              <option value={0}>Chọn thành phố</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Chọn ngày */}
        <div className="grid grid-cols-7 gap-1 mb-8">
          {dateOptions.map((day, index) => (
            <button
              key={index}
              className={`py-4 text-center rounded ${
                index === selectedDateIndex
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedDateIndex(index)}
            >
              <div className="text-sm font-medium">{day.displayDate}</div>
              <div className="text-xs text-gray-500">{day.day}</div>
            </button>
          ))}
        </div>

        {/* Danh sách rạp */}
        {theaters.length > 0 ? (
          <div className="space-y-4">
            {theaters.map((theater) => (
              <div key={theater.id} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full text-left bg-gray-50 p-4 border-b hover:bg-gray-100"
                  onClick={() => {
                    setSelectedTheaterId(theater.id)
                    setExpandedTheaterId((prev) => (prev === theater.id ? null : theater.id))
                  }}
                >
                  <h3 className="font-medium">{theater.name}</h3>
                  <p className="text-sm text-gray-500">{theater.address}</p>
                </button>

                {expandedTheaterId === theater.id && (
                  <div className="p-4">
                    {showtimes.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {showtimes
                          .sort((a, b) => (a.startTime ?? "").localeCompare(b.startTime ?? ""))
                          .map((showtime) => (
                            <Link
                              key={showtime.id}
                              href={`/dat-ve/${showtime.id}`}
                              className="border rounded p-2 text-center hover:border-red-500 cursor-pointer block"
                            >
                              <div className="text-sm font-medium">{formatTime(showtime.startTime)}</div>
                              <div className="text-xs text-gray-500">{formatPrice(showtime.price)}</div>
                            </Link>
                          ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">Không có suất chiếu</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-gray-400 text-lg">Vui lòng chọn thành phố để xem rạp</div>
          </div>
        )}
      </div>
    </div>
  )
}

// --------- Utility functions ---------

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`
}

function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDay()

  switch (day) {
    case 0:
      return "CN"
    case 1:
      return "T2"
    case 2:
      return "T3"
    case 3:
      return "T4"
    case 4:
      return "T5"
    case 5:
      return "T6"
    case 6:
      return "T7"
    default:
      return ""
  }
}

function formatTime(timeString: string | undefined): string {
  if (!timeString) return ""
  const [hours, minutes] = timeString.split(":")
  if (!hours || !minutes) return ""
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
}

function formatPrice(price: number | undefined): string {
  if (price == null) return ""
  return price.toLocaleString("vi-VN") + " đ"
}
