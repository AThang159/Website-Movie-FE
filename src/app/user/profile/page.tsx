"use client"

import UserProfile from "../../../components/user/user-profile"
import { UserAuthGuard } from "../../../components/user/user-auth-guard"
import { useEffect, useState } from "react";
import { UserResponse } from "@/types/user-response";
import { getUserProfile, logoutUser } from "@/lib/api/backend/user/user-api";

export default function ProfilePage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    const logout = async () => {
      try {
        await logoutUser();
        window.location.href = "/";
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    };
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
                <span className="text-gray-700">Xin chào, {user.firstName} {user.lastName}</span>
                <button
                  onClick={handleLogout}
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
          <UserProfile user={user} />
        </div>
      </div>
    </UserAuthGuard>
  )
}
