"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, Mail, Phone, Calendar } from "lucide-react"
import { fetchUsers } from "@/lib/api/users-api"
import { User } from "@/types/user"

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      fetchUsers()
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error:", err))
        .finally(() => setLoading(false))
    }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách người dùng</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Tìm kiếm người dùng..." className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Họ tên</th>
                  <th className="text-left p-3">Liên hệ</th>
                  <th className="text-left p-3">Ngày tham gia</th>
                  <th className="text-left p-3">Số lần đặt vé</th>
                  <th className="text-left p-3">Tổng chi tiêu</th>
                  <th className="text-left p-3">Trạng thái</th>
                  <th className="text-left p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className="font-medium">{}</span>
                    </td>
                    <td className="p-3 font-medium">{formatPrice(0)} đ</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Hoạt động" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
