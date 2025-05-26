"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import { fetchCities} from "../lib/api/cities-api"
import { fetchMovieFormats } from "@/lib/api/movie-formats-api"
import { fetchTheaters } from "@/lib/api/theaters-api"
import { fetchShowtimesByMovieAndDate } from "@/lib/api/showtimes-api"

interface MovieProps {
  movieId: string
}

export default function ShowtimesSelector({ movieId }: MovieProps) {
  const dateOptions = useMemo(() => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split("T")[0] // YYYY-MM-DD format
      dates.push({
        date: dateString,
        displayDate: formatDate(dateString),
        day: getDayOfWeek(dateString),
      })
    }

    return dates
  }, [])

  const [selectedCity, setSelectedCity] = useState("Hồ Chí Minh")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [showtimes, setShowtimes] = useState<any[]>([])
  const [theaters, setTheaters] = useState<any[]>([])
  const [cities, setCities] = useState<{ id: number; name: string }[]>([])
  const [movieFormats, setMovieFormats] = useState<{ id: number; name: string }[]>([])

  // Fetch cities and movie formats on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const citiesData = await fetchCities()
        setCities(citiesData)
        const formatsData = await fetchMovieFormats()
        setMovieFormats(formatsData)
      } catch (error) {
        console.error("Failed to fetch cities or movie formats", error)
      }
    }
    fetchData()
  }, [])

  // Fetch theaters on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const theatersData = await fetchTheaters()
        setTheaters(theatersData)
      } catch (error) {
        console.error("Failed to fetch theaters", error)
      }
    }
    fetchData()
  }, [])

  // Fetch showtimes when movieId or selectedDate changes
  useEffect(() => {
    if (dateOptions.length === 0) return
    const date = dateOptions[selectedDateIndex].date

    async function fetchData() {
      try {
        const showtimesData = await fetchShowtimesByMovieAndDate(movieId, date)
        setShowtimes(showtimesData)
      } catch (error) {
        console.error("Failed to fetch showtimes", error)
        setShowtimes([])
      }
    }
    fetchData()
  }, [movieId, selectedDateIndex, dateOptions])

  // Group showtimes by theater and filter by city and format
  const groupedShowtimes = useMemo(() => {
    const theaterShowtimes: Record<string, any> = {}

    showtimes.forEach((showtime) => {
      const theater = theaters.find((t) => t.id === showtime.theaterId)
      if (!theater) {
        console.log("❌ Bỏ showtime vì không tìm thấy theater với id:", showtime.theaterId)
        return
      }

      if (selectedFormat && `${showtime.format} ${showtime.language}` !== selectedFormat) {
        console.log("❌ Bỏ showtime vì format không khớp:", showtime.format, showtime.language)
        return
      }

      if (theater.cityName !== selectedCity) {
        console.log("❌ Bỏ showtime vì city không khớp:", theater.cityName, "!==", selectedCity)
        return
      }


      if (!theaterShowtimes[theater.id]) {
        theaterShowtimes[theater.id] = {
          theater,
          showtimes: [],
        }
      }

      theaterShowtimes[theater.id].showtimes.push(showtime)
    })

    return Object.values(theaterShowtimes).sort((a: any, b: any) =>
      a.theater.name.localeCompare(b.theater.name),
    )
  }, [showtimes, theaters, selectedCity, selectedFormat])
  console.log("groupedShowtimes", groupedShowtimes);  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-medium text-center mb-6">Lịch chiếu</h2>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <select
              className="w-full border rounded px-4 py-2.5 appearance-none focus:outline-none focus:ring-1 focus:ring-red-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              className="w-full border rounded px-4 py-2.5 appearance-none focus:outline-none focus:ring-1 focus:ring-red-500"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="">Định dạng</option>
              {movieFormats.map((format) => (
                <option key={format.id} value={format.name}>
                  {format.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-8">
          {dateOptions.map((day, index) => (
            <button
              key={index}
              className={`py-4 text-center rounded ${
                index === selectedDateIndex ? "bg-blue-100 text-blue-600" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedDateIndex(index)}
            >
              <div className="text-sm font-medium">{day.displayDate}</div>
              <div className="text-xs text-gray-500">{day.day}</div>
            </button>
          ))}
        </div>
        {groupedShowtimes.length > 0 ? (
          <div className="space-y-6">
            {groupedShowtimes.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">{item.theater.theaterChain.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{item.theater.name}</h3>
                      <p className="text-sm text-gray-500">{item.theater.address}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-3">
                    {item.showtimes
                      .sort((a: any, b: any) => (a.time ?? "").localeCompare(b.time ?? ""))
                      .map((showtime: any, idx: number) => (
                        <div key={idx} className="border rounded p-2 text-center hover:border-red-500 cursor-pointer">
                          <div className="text-sm font-medium">{formatTime(showtime.startTime)}</div>
                          <div className="text-xs text-gray-500">{formatPrice(showtime.price)}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="text-gray-400 text-lg">Không có suất chiếu</div>
          </div>
        )}
      </div>
    </div>
  )
}

// Utility functions (can be moved to utils if needed)
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
      return "Th 2"
    case 2:
      return "Th 3"
    case 3:
      return "Th 4"
    case 4:
      return "Th 5"
    case 5:
      return "Th 6"
    case 6:
      return "Th 7"
    default:
      return ""
  }
}

function formatTime(timeStr: string): string {
  // timeStr dạng "HH:mm:ss"
  const [hour, minute] = timeStr.split(":");
  return `${hour}:${minute}`;
}


function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫"
}
