import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { TheaterManagement } from "@/components/admin/theater-management"

export default function AdminTheatersPage() {
  return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <div className="flex-1 p-6">
            <TheaterManagement />
          </div>
        </div>
      </div>
    )
}
