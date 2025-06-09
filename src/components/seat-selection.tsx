"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShowtimeDetailResponse } from "@/types/showtime-detail-response"

interface SeatSelectionProps {
    showtimeData?: ShowtimeDetailResponse
    selectedSeatsData?: number[]
    onSelectionChange?: (selectedSeats: number[], totalPrice: number) => void
    goToStep: (step: number) => void;
}

export function SeatSelection({ 
    showtimeData, 
    selectedSeatsData,
    onSelectionChange,
    goToStep }: SeatSelectionProps) {
    
    const [showtime, setShowtime] = useState<ShowtimeDetailResponse>();
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if (showtimeData) setShowtime(showtimeData);
        console.log(showtimeData)
    }, [showtimeData]);

    useEffect(() => {
        if (selectedSeatsData) setSelectedSeats(selectedSeatsData);
    }, [selectedSeatsData]);

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
        if (showtime?.tickets?.some(ticket => ticket.seat.id === seatId)) return "unavailable"
        return "available"
    }

    const rows = Array.from(new Set(showtime?.room?.seats.map(seat => seat.row) || [])).sort();

    const getSeatColor = (status: string) => {
        switch (status) {
            case "selected":
                return "bg-green-500 hover:bg-green-600"
            case "unavailable":
                return "bg-gray-400 cursor-not-allowed"
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
                                <span className="text-sm">Có thể chọn</span>
                            </div>
                        </div>

                        {/* Screen */}
                        <div className="text-center mb-8">
                            <div className="bg-gray-800 text-white py-3 px-8 rounded-lg inline-block">MÀN HÌNH</div>
                        </div>

                        {/* Seating Chart */}
                        <div className="space-y-3">
                            {rows.map((row) => {
                                const seatsInRow = showtime?.room?.seats
                                    .filter(seat => seat.row === row)
                                    .sort((a, b) => a.columnIndex - b.columnIndex) || [];

                                return (
                                    <div key={row} className="flex items-center justify-center space-x-2">
                                        <div className="w-8 text-center font-medium text-gray-600">{row}</div>
                                        <div className="flex space-x-1">
                                            {seatsInRow.map(seat => {
                                                const status = getSeatStatus(seat.id);

                                                return (
                                                    <button
                                                        key={seat.id}
                                                        onClick={() => toggleSelectSeat(seat.id)}
                                                        className={`w-6 h-6 rounded text-xs font-medium transition-colors ${getSeatColor(status)}`}
                                                        disabled={status === "unavailable"}
                                                    >
                                                        {seat.columnIndex}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
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
                                        .map(id => showtime?.room?.seats.find(seat => seat.id === id)?.seatCode)
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