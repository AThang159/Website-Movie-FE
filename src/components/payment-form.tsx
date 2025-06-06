"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Smartphone, Building2 } from "lucide-react"
import { SeatStatus } from "@/types/seat-status"
import { ShowtimeDetail } from "@/types/showtime-detail"
import { createPayment } from "@/lib/api/payment-api"

interface PaymentFormProps {
    showtimeData?: ShowtimeDetail
    seatStatusesData?: SeatStatus[]
    selectedSeatsData?: number[]
    totalPriceData?: number
    onSelectionChange?: (selectedSeats: number[], totalPrice: number) => void
    goToStep: (step: number) => void;
}

export function PaymentForm({ 
    showtimeData, 
    seatStatusesData,
    selectedSeatsData,
    totalPriceData,
    onSelectionChange,
    goToStep
 }: PaymentFormProps) {

    const [showtime, setShowtime] = useState<ShowtimeDetail>();
    const [seatStatuses, setSeatStatuses] = useState<SeatStatus[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [serviceFee, setServiceFee] = useState<number>(0);

    const [customerFirstName, setCustomerFirstName] = useState<string>("");
    const [customerLastName, setCustomerLastName] = useState<string>("");
    const [customerEmail, setCustomerEmail] = useState<string>("");
    const [customerPhone, setCustomerPhone] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (showtimeData) setShowtime(showtimeData);
    }, [showtimeData]);

    useEffect(() => {
        if (seatStatusesData) setSeatStatuses(seatStatusesData);
    }, [seatStatusesData]);

    useEffect(() => {
        if (selectedSeatsData) setSelectedSeats(selectedSeatsData);
    }, [selectedSeatsData]);

    useEffect(() => {
        if (totalPriceData) setTotalPrice(totalPriceData);
    }, [totalPriceData]);

    useEffect(() => {
        setServiceFee(selectedSeats.length * 5000);
    }, [selectedSeats])

    const [paymentMethod, setPaymentMethod] = useState("credit-card")
    const [agreeTerms, setAgreeTerms] = useState(false)

    const handleContinue = async () => {
      if (!agreeTerms) {
        alert("Bạn cần đồng ý với điều khoản trước khi thanh toán.")
        return
      }

      // if (!customerFirstName || !customerLastName || !customerPhone || !customerEmail) {
      //   alert("Vui lòng điền đầy đủ thông tin khách hàng.")
      //   return
      // }

      setLoading(true)
      setError(null)

      try {
        const amount = totalPrice + serviceFee;

        const data = await createPayment({
          amount,
          customerFirstName,
          customerLastName,
          customerPhone,
          customerEmail,
          selectedSeatIds: selectedSeats,
          totalPrice,
          serviceFee,
          paymentMethod
        });

        if (!data.url) {
          throw new Error("Không nhận được URL thanh toán");
        }

        if (onSelectionChange) {
          onSelectionChange(selectedSeats, totalPrice);
        }

        window.location.href = data.url;
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi khi tạo thanh toán");
        console.error("VNPay error:", err);
      } finally {
        setLoading(false);
      }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price)
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Payment Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Phương thức thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="credit-card" className="flex-1">
                    VNPay
                  </Label>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-blue-100 rounded"></div>
                    <div className="w-10 h-6 bg-red-100 rounded"></div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="momo" id="momo" />
                  <Smartphone className="w-5 h-5 text-pink-600" />
                  <Label htmlFor="momo" className="flex-1">
                    Ví MoMo
                  </Label>
                  <div className="w-10 h-6 bg-pink-100 rounded"></div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="zalopay" id="zalopay" />
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="zalopay" className="flex-1">
                    ZaloPay
                  </Label>
                  <div className="w-10 h-6 bg-blue-100 rounded"></div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Building2 className="w-5 h-5 text-green-600" />
                  <Label htmlFor="bank-transfer" className="flex-1">
                    Chuyển khoản ngân hàng
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">Họ</Label>
                <Input id="first-name" placeholder="Nguyễn" />
              </div>
              <div>
                <Label htmlFor="last-name">Tên</Label>
                <Input id="last-name" placeholder="Văn A" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="0123 456 789" />
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                Tôi đồng ý với{" "}
                <a href="#" className="text-red-500 hover:underline">
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="#" className="text-red-500 hover:underline">
                  Chính sách bảo mật
                </a>{" "}
                của Moveek. Tôi xác nhận rằng tôi đã đọc và hiểu các điều khoản này.
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-sm">{showtime?.movie?.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{showtime?.theater?.name}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Suất chiếu:</span>
                <span>{showtime?.startTime} {showtime?.showDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Phòng chiếu:</span>
                <span>{showtime?.room?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Ghế:</span>
                <span>
                    {selectedSeats
                        .map(id => seatStatuses.find(seat => seat.id === id)?.seat.seatCode)
                        .filter(Boolean)
                        .join(", ") || "..."}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vé ({selectedSeats.length}x)</span>
                <span>{formatPrice(totalPrice)} đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí dịch vụ</span>
                <span>{formatPrice(serviceFee)} đ</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Tổng cộng</span>
                <span className="text-red-500">{formatPrice(totalPrice + serviceFee)} đ</span>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg text-sm">
              <p className="text-yellow-800">
                ⚠️ Vé đã mua không thể đổi hoặc hoàn tiền. Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button className="px-8 py-2 border border-gray-300 rounded-md text-gray-700" onClick={() => goToStep(1)}>
                ← Quay lại
              </button>
              <button
                className="px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                disabled={!agreeTerms}
                onClick={handleContinue}
              >
                Thanh toán
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
