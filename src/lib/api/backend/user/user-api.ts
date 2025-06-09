import { UserResponse } from "@/types/user-response";
import { API_BACKEND_URL } from "../config";
import { ApiResponse } from "@/types/api-response";

export const getUserProfile = async (): Promise<UserResponse> => {
  const res = await fetch(`${API_BACKEND_URL}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user profile");

  const json: ApiResponse<UserResponse> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);

  if (typeof json.data !== "object" || json.data === null) {
    throw new Error("Invalid user data format");
  }

  return json.data;
};

export const logoutUser = async (): Promise<void> => {
    const res = await fetch(`${API_BACKEND_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  
    if (!res.ok) throw new Error("Failed to logout");
  
    const json: ApiResponse<null> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
  };