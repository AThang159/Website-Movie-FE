import { User } from "@/types/user";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:8080/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}