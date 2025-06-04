"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email) {
      setError("Vui lòng nhập email")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Email không hợp lệ")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Email đã được gửi!</h2>
              <p className="text-gray-600 mb-6">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn. Nếu không thấy email, hãy kiểm tra thư mục spam.
              </p>
              <Button
                className="w-full bg-red-500 hover:bg-red-600"
                onClick={() => (window.location.href = "/admin/login")}
              >
                Quay lại đăng nhập
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quên mật khẩu</h1>
          <p className="text-gray-600">Nhập email để nhận hướng dẫn đặt lại mật khẩu</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Đặt lại mật khẩu</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@moveek.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang gửi...</span>
                  </div>
                ) : (
                  "Gửi hướng dẫn"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = "/admin/login")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại đăng nhập
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
