"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, HelpCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Showtime } from "@/types/showtime"
import { SeatStatus } from "@/types/seat-status"
import { ShowtimeDetail } from "@/types/showtime-detail"

interface SeatSelectionProps {
    showtimeData?: ShowtimeDetail
    seatStatusesData?: SeatStatus[]
    unavailableSeatsData?: number[]
    selectedSeatsData?: number[]
    vipSeatsData?: number[]
    onSelectionChange?: (selectedSeats: number[], totalPrice: number) => void
    goToStep: (step: number) => void;
}

export function SeatSelection({ 
    showtimeData, 
    seatStatusesData,
    unavailableSeatsData,
    selectedSeatsData,
    vipSeatsData,
    onSelectionChange,
    goToStep }: SeatSelectionProps) {
    
    const [showtime, setShowtime] = useState<ShowtimeDetail>();
    const [seatStatuses, setSeatStatuses] = useState<SeatStatus[]>([]);
    const [unavailableSeats, setUnavailableSeats] = useState<number[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [vipSeats, setVipSeats] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if (showtimeData) setShowtime(showtimeData);
    }, [showtimeData]);

    useEffect(() => {
        if (seatStatusesData) setSeatStatuses(seatStatusesData);
    }, [seatStatusesData]);

    useEffect(() => {
        if (unavailableSeatsData) setUnavailableSeats(unavailableSeatsData);
    }, [unavailableSeatsData]);

    useEffect(() => {
        if (selectedSeatsData) setSelectedSeats(selectedSeatsData);
    }, [selectedSeatsData]);

    useEffect(() => {
        if (vipSeatsData) setVipSeats(vipSeatsData);
    }, [vipSeatsData]);

    const handleContinue = () => {
        if (onSelectionChange) {
            onSelectionChange(selectedSeats, totalPrice);
        }
        goToStep(2);
    };

    const toggleSelectSeat = (seatId: number) => {
        setSelectedSeats(prev =>
        prev.includes(seatId)
            ? prev.filter(id => id !== seatId).sort((a, b) => a - b)
            : [...prev, seatId].sort((a, b) => a - b)
        )
    }

    const getSeatStatus = (seatId: number) => {
        if (selectedSeats.includes(seatId)) return "selected"
        if (unavailableSeats.includes(seatId)) return "unavailable"
        if (vipSeats.includes(seatId)) return "vip"
        return "available"
    }

    const rows = Array.from(new Set(seatStatuses.map(seatStatus => seatStatus.seat.row))).sort();


    const getSeatColor = (status: string) => {
        switch (status) {
        case "selected":
            return "bg-green-500 hover:bg-green-600"
        case "unavailable":
            return "bg-gray-400 cursor-not-allowed"
        case "vip":
            return "bg-yellow-400 hover:bg-yellow-500"
        default:
            return "bg-gray-200 hover:bg-gray-300"
        }
    }

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
    };

    useEffect(() => {
        if (showtime) {
            setTotalPrice(selectedSeats.length * showtime.price);
        }
    }, [selectedSeats, showtime]);

    return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Seat Selection */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardContent className="p-6">
                        {/* Legend */}
                        <div className="flex items-center justify-center space-x-6 mb-6">
                            <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm">Ghế bạn chọn</span>
                            </div>
                            <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-400 rounded"></div>
                            <span className="text-sm">Không thể chọn</span>
                            </div>
                            <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-200 rounded"></div>
                            <span className="text-sm">Đã bán</span>
                            </div>
                        </div>

                        {/* Screen */}
                        <div className="text-center mb-8">
                            <div className="bg-gray-800 text-white py-3 px-8 rounded-lg inline-block">MÀN HÌNH</div>
                        </div>

                        {/* Seating Chart */}
                        <div className="space-y-3">
                            {rows.map((row) => {
                            // Lọc ghế trong hàng row và sắp xếp theo column
                            const seatStatusesInRow = seatStatuses
                                .filter(seatStatus => seatStatus.seat.row === row)
                                .sort((a, b) => a.seat.columnIndex - b.seat.columnIndex);

                            return (
                                <div key={row} className="flex items-center justify-center space-x-2">
                                <div className="w-8 text-center font-medium text-gray-600">{row}</div>
                                <div className="flex space-x-1">
                                    {seatStatusesInRow.map(seatStatuses => {
                                    const status = getSeatStatus(seatStatuses.id);

                                    return (
                                        <button
                                        key={seatStatuses.seat.seatCode}
                                        onClick={() => toggleSelectSeat(seatStatuses.id)}
                                        className={`w-6 h-6 rounded text-xs font-medium transition-colors ${getSeatColor(status)}`}
                                        disabled={status === "unavailable"}
                                        >
                                        {seatStatuses.seat.columnIndex}
                                        </button>
                                    );
                                    })}
                                </div>
                                </div>
                            );
                            })}
                        </div>


                        {/* Seat Types */}
                        <div className="flex items-center justify-center space-x-8 mt-8">
                            <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-200 rounded"></div>
                            <span className="text-sm">Standard</span>
                            </div>
                            <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                            <span className="text-sm">VIP</span>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Movie Info & Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-4">{showtime?.movie?.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div>
                            Rạp <span className="font-medium">{showtime?.theater?.name}</span>
                            </div>
                            <div>
                            Suất <span className="font-medium">{showtime?.startTime}</span>
                            </div>
                            <div>
                            Ngày <span className="font-medium">{showtime?.showDate}</span>
                            </div>
                            <div>
                            Phòng chiếu <span className="font-medium">{showtime?.room?.name}</span>
                            </div>
                            <div>
                            Ghế{" "}
                            <span className="font-medium">
                                {selectedSeats
                                .map(id => seatStatuses.find(seat => seat.id === id)?.seat.seatCode)
                                .filter(Boolean)
                                .join(", ") || "..."}
                            </span>
                            </div>
                        </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">TỔNG ĐƠN HÀNG</div>
                            <div className="text-3xl font-bold">
                                {formatVND(totalPrice)}
                            </div>
                        </div>
                        </CardContent>
                    </Card>

                    <div className="flex space-x-4">
                        <Button variant="outline" className="flex-1" onClick={() => goToStep(1)}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        </Button>
                        <Button className="flex-1 bg-gray-600 hover:bg-gray-700" onClick={handleContinue}>Tiếp tục</Button>
                    </div>
                </div>
            </div>
    )
}