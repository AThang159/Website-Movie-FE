import { ApiResponse } from "@/types/api-response";
import { API_BACKEND_URL } from "./config";

export interface Overview {
    countMovies: number;
    countUsers: number;
    countTheaters: number;
    countBookings: number;
}

export async function fetchOverview(): Promise<Overview>{
  const res = await fetch(`${API_BACKEND_URL}/dashboard/overview`);
  if (!res.ok) throw new Error("Failed to fetch overview");

  const json: ApiResponse<Overview> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);

  return json.data;
}
