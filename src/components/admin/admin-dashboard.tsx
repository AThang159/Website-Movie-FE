"use client"

import { useState } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"
import { MovieManagement } from "./movie-management"
import { CinemaManagement } from "./cinema-management"
import { ShowtimeManagement } from "./showtime-management"
import { UserManagement } from "./user-management"
import { BookingManagement } from "./booking-management"
import { DashboardOverview } from "./dashboard-overview"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "movies":
        return <MovieManagement />
      case "cinemas":
        return <CinemaManagement />
      case "showtimes":
        return <ShowtimeManagement />
      case "users":
        return <UserManagement />
      case "bookings":
        return <BookingManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
