"use client"

import UserProfile from "../../components/user/user-profile"
import { UserAuthGuard } from "../../components/user/user-auth-guard"

export default function ProfilePage() {
  return (
    <UserAuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <span className="text-red-600 font-bold text-2xl">moveek</span>
                <nav className="hidden md:flex space-x-6">
                  <a href="/" className="text-gray-600 hover:text-red-600">
                    Trang chủ
                  </a>
                  <a href="#" className="text-gray-600 hover:text-red-600">
                    Phim
                  </a>
                  <a href="#" className="text-gray-600 hover:text-red-600">
                    Rạp
                  </a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Xin chào, Nguyễn Văn A</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("userToken")
                    localStorage.removeItem("userName")
                    window.location.href = "/login"
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Trang cá nhân</h1>
          <UserProfile />
        </div>
      </div>
    </UserAuthGuard>
  )
}
