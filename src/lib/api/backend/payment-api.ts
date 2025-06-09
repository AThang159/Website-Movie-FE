import { ApiResponse } from "@/types/api-response";
import { API_BACKEND_URL } from "./config";
import { BookingRequest } from "@/types/booking-request";


export interface PaymentResponse {
  url: string
}

export async function createPayment(requestData: BookingRequest): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${API_BACKEND_URL}/payment/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create payment: ${response.status} - ${errorText}`);
    }

    const data: ApiResponse<PaymentResponse> = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Payment creation failed");
    }

    return data.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}
