import { UserResponse } from "@/types/user-response";
import { API_BACKEND_URL } from "../config";
import { ApiResponse } from "@/types/api-response";


export async function fetchUsers(): Promise<UserResponse[]> {
  const res = await fetch(`${API_BACKEND_URL}/admin/users/all`, {
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<UserResponse[]> = await res.json();

  if (!json.success) {
    throw new Error(`API error: ${json.message}`);
  }

  if (!Array.isArray(json.data)) {
    throw new Error("API data format error: data is not an array");
  }

  return json.data;
}
