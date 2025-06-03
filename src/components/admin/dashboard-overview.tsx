import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Building2, Users, Ticket, TrendingUp, Calendar } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    { title: "Tổng phim", value: "156", icon: Film, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Rạp chiếu", value: "24", icon: Building2, color: "text-green-600", bg: "bg-green-100" },
    { title: "Người dùng", value: "12,543", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Vé đã bán", value: "8,921", icon: Ticket, color: "text-red-600", bg: "bg-red-100" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
        })}
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
            <div className="space-y-3">
              {[
                { movie: "Doraemon Movie 44", time: "08:00", cinema: "Beta Trần Quang Khải", sold: "45/120" },
                { movie: "Spider-Man: No Way Home", time: "10:30", cinema: "CGV Vincom", sold: "89/150" },
                { movie: "Avatar: The Way of Water", time: "14:00", cinema: "Lotte Cinema", sold: "120/180" },
              ].map((show, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{show.movie}</p>
                    <p className="text-sm text-gray-600">
                      {show.time} - {show.cinema}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{show.sold}</p>
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
