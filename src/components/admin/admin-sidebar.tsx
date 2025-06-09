"use client"

import {
  LayoutDashboard,
  Film,
  Building2,
  Calendar,
  Users,
  Ticket,
  Settings,
  LogOut,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "movies", label: "Quản lý phim", icon: Film },
    { id: "theaters", label: "Quản lý rạp", icon: Building2 },
    { id: "showtimes", label: "Suất chiếu", icon: Calendar },
    { id: "users", label: "Người dùng", icon: Users },
    { id: "bookings", label: "Đặt vé", icon: Ticket },
  ]

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen relative">
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">Moveek Admin</h1>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === `/admin/${item.id}`

          return (
            <Link
              key={item.id}
              href={`/admin/${item.id}`}
              className={clsx(
                "w-full flex items-center px-6 py-3 text-left hover:bg-gray-50",
                isActive
                  ? "bg-red-50 text-red-600 border-r-2 border-red-600"
                  : "text-gray-700"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-6 border-t">
        <button className="flex items-center text-gray-700 hover:text-red-600">
          <Settings className="w-5 h-5 mr-3" />
          Cài đặt
        </button>
        <button className="flex items-center text-gray-700 hover:text-red-600 mt-3">
          <LogOut className="w-5 h-5 mr-3" />
          Đăng xuất
        </button>
      </div>
    </div>
  )
}
