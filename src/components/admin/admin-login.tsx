"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Email không hợp lệ")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Demo credentials
      if (formData.email === "admin@moveek.com" && formData.password === "admin123") {
        // Simulate successful login
        localStorage.setItem("adminToken", "demo-token")
        if (rememberMe) {
          localStorage.setItem("rememberAdmin", "true")
        }
        router.push("/admin")
      } else {
        setError("Email hoặc mật khẩu không chính xác")
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Moveek Admin</h1>
          <p className="text-gray-600">Đăng nhập vào hệ thống quản trị</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@moveek.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <a href="#" className="text-sm text-red-600 hover:text-red-700">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang đăng nhập...</span>
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Thông tin đăng nhập demo:</p>
                  <p className="text-blue-700">Email: admin@moveek.com</p>
                  <p className="text-blue-700">Mật khẩu: admin123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 Moveek. Tất cả quyền được bảo lưu.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-red-600">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-red-600">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-red-600">
              Hỗ trợ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
