import { API_BACKEND_URL } from "./config";

type LoginPayload = {
  username: string;
  password: string;
};

export async function fetchLoginRequest({ username, password }: LoginPayload) {
  const res = await fetch(`${API_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Unauthorized");
    }
    const errorText = await res.text();
    throw new Error(`HTTP error ${res.status}: ${errorText}`);
  }

  return res.json();
}
