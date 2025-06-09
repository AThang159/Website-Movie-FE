"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TheaterResponse } from "@/types/theater-response"
import { TheaterRequest } from "@/types/theater-request"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface TheaterFormProps {
  theater?: TheaterResponse
  onSubmit: (data: TheaterRequest) => Promise<void>
  onCancel: () => void
}

export function TheaterForm({ theater, onSubmit, onCancel }: TheaterFormProps) {
  const [format, setFormat] = useState<string>("2D")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    const data: TheaterRequest = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      countRoom: Number(formData.get("countRoom")),
      status: theater?.status || "Hoạt động",
      city: formData.get("city") as string
    }

    await onSubmit(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{theater ? "Chỉnh sửa rạp chiếu" : "Thêm rạp chiếu mới"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Tên rạp</Label>
              <Input 
                id="name"
                name="name"
                placeholder="Nhập tên rạp"
                defaultValue={theater?.name}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Địa chỉ</Label>
              <Input 
                id="address"
                name="address"
                placeholder="Nhập địa chỉ đầy đủ"
                defaultValue={theater?.address}
                required
              />
            </div>
            <div>
              <Label htmlFor="countRoom">Số phòng chiếu</Label>
              <Input 
                id="countRoom"
                name="countRoom"
                type="number"
                placeholder="Nhập số phòng chiếu"
                required
              />
            </div>
            <div>
              <Label htmlFor="city">Thành phố</Label>
              <Input 
                id="city"
                name="city"
                placeholder="Nhập tên thành phố"
                required
              />
            </div>
            <div>
              <Label htmlFor="format">Định dạng</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn định dạng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2D">2D</SelectItem>
                  <SelectItem value="3D">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              {theater ? "Cập nhật" : "Thêm rạp"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 