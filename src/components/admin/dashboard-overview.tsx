"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchOverview } from "@/lib/api/admin-api"
import { fetchShowtimesToday } from "@/lib/api/showtimes-api";
import { Showtime } from "@/types/showtime";
import { Film, Building2, Users, Ticket, TrendingUp, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

type StatItem = {
  title: string;
  value?: number;
  icon: any;
  bg: string;
  color: string;
};

export interface Overview {
    countMovies: number;
    countUsers: number;
    countTheaters: number;
    countBookings: number;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<StatItem[]>();
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOverview();
        console.log(response)
        const convertedStats: StatItem[] = [
          {
            title: "Tổng số phim",
            value: response?.data.countMovies,
            icon: Film,
            bg: "bg-blue-100",
            color: "text-blue-600"
          },
          {
            title: "Tổng số rạp",
            value: response?.data.countTheaters,
            icon: Building2,
            bg: "bg-green-100",
            color: "text-green-600"
          },
          {
            title: "Tổng số người dùng",
            value: response?.data.countUsers,
            icon: Users,
            bg: "bg-yellow-100",
            color: "text-yellow-600"
          },
          {
            title: "Lượt đặt vé",
            value: response?.data.countBookings,
            icon: Ticket,
            bg: "bg-red-100",
            color: "text-red-600"
          },
        ];

        setStats(convertedStats);

      } catch (error) {
        console.log("Failed to fetch stats overview", error);
        setStats(undefined);
      }
    };
    fetchData();
  },[])

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetchShowtimesToday();
        setShowtimes(response);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu suất chiếu:", error);
      }
    };

    fetchShowtimes();
  }, []);



  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats ? (
          stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bg}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <p className="col-span-4 text-center text-gray-500">Đang tải thống kê...</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Doanh thu theo tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Biểu đồ doanh thu sẽ được hiển thị ở đây
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Suất chiếu hôm nay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {showtimes.map((show, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{show.movie.title}</p>
                    <p className="text-sm text-gray-600">
                      {show.startTime} - {show.theater?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{show.seatsTotal - show.seatsAvailable}</p>
                    <p className="text-xs text-gray-500">Đã bán</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
