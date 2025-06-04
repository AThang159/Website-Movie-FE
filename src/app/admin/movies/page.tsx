import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { MovieManagement } from "@/components/admin/movie-management"

export default function AdminMoviesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="flex-1 p-6">
          <MovieManagement />
        </div>
      </div>
    </div>
  )
}
