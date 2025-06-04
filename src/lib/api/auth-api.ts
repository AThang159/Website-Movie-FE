import { API_BASE_URL } from "./config";

type LoginPayload = {
  username: string;
  password: string;
};

export async function fetchLoginRequest({ username, password }: LoginPayload) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include'
  });

  if (!res.ok) throw new Error("Failed to fetch login");
  return res.json();
}
