"use client"

import { useState, useEffect } from "react"
import { fetchShowtime } from "@/lib/api/backend/showtime-api"
import { SeatSelection } from "./seat-selection";
import { PaymentForm } from "./payment-form";
import { ShowtimeDetailResponse } from "@/types/showtime-detail-response"

interface MovieBookingProps {
  showtimeId: string
}

export default function MovieBooking({ showtimeId }: MovieBookingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showtime, setShowtime] = useState<ShowtimeDetailResponse>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchShowtime(showtimeId);
        // console.log(response);
        setShowtime(response);
      } catch (error) {
        console.error("Failed to fetch showtime", error);
        setShowtime(undefined);
      }
    }
    fetchData();
  }, []);

  const handleSelectionChange = (seats: number[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SeatSelection 
            showtimeData={showtime} 
            selectedSeatsData={selectedSeats}
            onSelectionChange={handleSelectionChange}            
            goToStep={setCurrentStep} 
          />
        )
      case 2: 
        return (
          <div>
            <PaymentForm 
              showtimeData={showtime} 
              selectedSeatsData={selectedSeats}
              totalPriceData={totalPrice}
              goToStep={setCurrentStep}
            />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Booking Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white mb-2">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <span className="text-sm text-red-600 font-medium">Chọn ghế</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
              </div>
              <span className="text-sm text-gray-500">Thanh toán</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
              </div>
              <span className="text-sm text-gray-500">Thông tin vé</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderCurrentStep()}
      </div>
    </div>
  )
}
