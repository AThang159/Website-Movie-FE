"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MapPin, CircleHelp, User } from "lucide-react";
import { getUserProfile, logoutUser } from "@/lib/api/backend/user/user-api";
import { UserResponse } from "@/types/user-response";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto max-w-7xl px-2 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Moveek"
              width={100}
              height={20}
            />
          </Link>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 text-sm">
            <Link
              href="/lich-chieu"
              className="text-moveek-darkgray hover:text-moveek-red whitespace-nowrap"
            >
              Lịch chiếu
            </Link>

            {/* Phim Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="text-moveek-darkgray p-0 hover:text-moveek-red h-auto"
                >
                  Phim <span className="ml-1">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <Link href="/dang-chieu" className="w-full">
                    Đang chiếu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/sap-chieu" className="w-full">
                    Sắp chiếu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/chieu-som" className="w-full">
                    Chiếu sớm
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/phim-thang-05-2025" className="w-full">
                    Phim tháng 05/2025
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/phim-viet-nam" className="w-full">
                    Phim Việt Nam
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rạp Link */}
            <Link
              href="/rap"
              className="text-moveek-darkgray hover:text-moveek-red whitespace-nowrap"
            >
              Rạp
            </Link>

            {/* Tin tức Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="text-moveek-darkgray p-0 hover:text-moveek-red h-auto"
                >
                  Tin tức <span className="ml-1">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <Link href="/tin-tuc" className="w-full">
                    Tin điện ảnh
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/danh-gia-phim" className="w-full">
                    Đánh giá phim
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/video" className="w-full">
                    Video
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/community"
              className="text-moveek-darkgray hover:text-moveek-red whitespace-nowrap"
            >
              Cộng đồng
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex relative flex-1 max-w-xs mx-4">
            <Input
              type="text"
              placeholder="Tìm phim, diễn viên, rạp..."
              className="pl-8 pr-4 py-1 w-full rounded-full border-gray-300 text-sm"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            />
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-1.5 text-moveek-darkgray hover:text-moveek-red">
              <MapPin className="h-4 w-4" />
            </button>
            <Link
              href="/support"
              className="p-1.5 text-moveek-darkgray hover:text-moveek-red"
            >
              <CircleHelp className="h-4 w-4" />
            </Link>
            {!isLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-1.5 h-auto hover:bg-transparent">
                      <div className="flex items-center text-sm text-moveek-darkgray">
                        <User className="h-4 w-4" />
                        <span className="ml-1.5 max-w-[70px] truncate">{user.lastName || "Tài khoản"}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>
                      <Link href="/profile" className="w-full">
                        Thông tin tài khoản
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/lich-su-dat-ve" className="w-full">
                        Lịch sử đặt vé
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/login"
                  className="p-1.5 text-moveek-darkgray hover:text-moveek-red"
                >
                  <User className="h-4 w-4" />
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-2 lg:hidden">
            <nav className="flex flex-col space-y-2 pb-2">
              <Link
                href="/lich-chieu"
                className="text-moveek-darkgray hover:text-moveek-red"
              >
                Lịch chiếu
              </Link>
              <div className="flex flex-col space-y-1 ml-3">
                <Link
                  href="/dang-chieu"
                  className="text-moveek-darkgray hover:text-moveek-red"
                >
                  Đang chiếu
                </Link>
                <Link
                  href="/sap-chieu"
                  className="text-moveek-darkgray hover:text-moveek-red"
                >
                  Sắp chiếu
                </Link>
                <Link
                  href="/chieu-som"
                  className="text-moveek-darkgray hover:text-moveek-red"
                >
                  Chiếu sớm
                </Link>
              </div>
              <Link
                href="/rap"
                className="text-moveek-darkgray hover:text-moveek-red"
              >
                Rạp
              </Link>
              <div className="flex flex-col space-y-1 ml-3">
                <Link
                  href="/tin-tuc"
                  className="text-moveek-darkgray hover:text-moveek-red"
                >
                  Tin điện ảnh
                </Link>
                <Link
                  href="/danh-gia-phim"
                  className="text-moveek-darkgray hover:text-moveek-red"
                >
                  Đánh giá phim
                </Link>
              </div>
              <Link
                href="/community"
                className="text-moveek-darkgray hover:text-moveek-red"
              >
                Cộng đồng
              </Link>
            </nav>
            <div className="flex items-center justify-between pt-2 border-t">
              <Link
                href="/support"
                className="flex items-center text-sm text-moveek-darkgray hover:text-moveek-red"
              >
                <CircleHelp className="h-4 w-4 mr-1" />
                Hỗ trợ
              </Link>
              {!isLoading && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-1 h-auto hover:bg-transparent">
                        <div className="flex items-center text-sm text-moveek-darkgray">
                          <User className="h-4 w-4" />
                          <span className="ml-1 max-w-[60px] truncate">{user.lastName || "Tài khoản"}</span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem>
                        <Link href="/profile" className="w-full">
                          Thông tin tài khoản
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/lich-su-dat-ve" className="w-full">
                          Lịch sử đặt vé
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center text-sm text-moveek-darkgray hover:text-moveek-red"
                  >
                    <User className="h-4 w-4 mr-1" />
                    <span className="ml-1 max-w-[60px] truncate">{"Đăng nhập"}</span>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
