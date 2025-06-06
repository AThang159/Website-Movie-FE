import { ApiResponse } from "@/types/api-response";
import { Chain } from "@/types/chain";

export async function fetchChains(): Promise<Chain[]> {
  const res = await fetch("http://localhost:8080/api/chains");
  if (!res.ok) throw new Error("Failed to fetch chains");

  const json: ApiResponse<Chain[]> = await res.json();

  if (!json.success) throw new Error(`API error: ${json.message}`);
  if (!Array.isArray(json.data)) throw new Error("Invalid data format");

  return json.data;
}
