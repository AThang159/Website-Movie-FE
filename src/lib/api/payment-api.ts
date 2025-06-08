import { ApiResponse } from "@/types/api-response";
import { API_BACKEND_URL } from "./config";

interface CreatePaymentParams {
  amount: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  selectedSeatIds: number[];
  totalPrice: number;
  serviceFee: number;
  paymentMethod: string;
}

export interface PaymentResponse {
  url: string
}

export async function createPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${API_BACKEND_URL}/payment/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: params.amount,
        userId: null,
        customerFullName: `${params.customerFirstName} ${params.customerLastName}`,
        customerPhone: params.customerPhone,
        customerEmail: params.customerEmail,
        seatStatusIds: params.selectedSeatIds,
        totalPrice: params.totalPrice,
        serviceFee: params.serviceFee,
        paymentMethod: params.paymentMethod,
      }),
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
