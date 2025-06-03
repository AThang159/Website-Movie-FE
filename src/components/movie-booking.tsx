"use client"

import { useState, useEffect } from "react"
import { fetchShowtime } from "@/lib/api/showtimes-api"
import { SeatStatus } from "@/types/seat-status"
import { SeatSelection } from "./seat-selection";
import { PaymentForm } from "./payment-form";
import { ShowtimeDetail } from "@/types/showtime-detail"
import { fetchSeatStatusesByShowtime } from "@/lib/api/seat-statuses-api";


interface MovieBookingProps {
  showtimeId: string
}

export default function MovieBooking({ showtimeId }: MovieBookingProps) {

  const [currentStep, setCurrentStep] = useState(1);

  const [showtime, setShowtime] = useState<ShowtimeDetail>();
  const [seatStatuses, setSeatStatuses] = useState<SeatStatus[]>([]);
  const [unavailableSeats, setUnavailableSeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [vipSeats, setVipSeats] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);


  useEffect(() =>{
      const fetchData = async () => {
          try {
              const response = await fetchShowtime(showtimeId);
              console.log(response);
              setShowtime(response);
          } catch (error){
              console.error("Failed to fetch showtime", error);
              setShowtime(undefined);
          }
      }
      fetchData();
  }, []);

  useEffect(() => {
      if (!showtime) return

      const fetchData = async () => {
          try {
              const seatStatuses = await fetchSeatStatusesByShowtime(showtimeId)
              const vipSeats = seatStatuses
              .filter((s) => s.seat.type === "VIP")
              .map((s) => s.seat.id)
              setVipSeats(vipSeats) 
              const bookedSeats = seatStatuses
              .filter((s) => s.ticketId !== null)
              .map((s) => s.id)
              setUnavailableSeats(bookedSeats)
              setSeatStatuses(seatStatuses)
          } catch (error) {
              console.error("Failed to fetch seat statuses", error)
              setUnavailableSeats([])
          }
      }
      fetchData()
  }, [showtime])

  const handleSelectionChange = (seats: number[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return(
          <SeatSelection 
            showtimeData={showtime} 
            seatStatusesData={seatStatuses}
            unavailableSeatsData={unavailableSeats}
            selectedSeatsData={selectedSeats}
            vipSeatsData={vipSeats}
            onSelectionChange={handleSelectionChange}            
            goToStep={setCurrentStep} />
        )
      case 2: 
        return (
          <div>
            <PaymentForm 
              showtimeData={showtime} 
              seatStatusesData={seatStatuses}
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
