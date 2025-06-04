"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UserAuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function UserAuthGuard({ children, requireAuth = true }: UserAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("userToken")
      if (token) {
        setIsAuthenticated(true)
      } else if (requireAuth) {
        router.push("/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router, requireAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  return <>{children}</>
}
