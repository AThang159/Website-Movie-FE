import { Chain } from "@/types/chain";

export async function fetchChains(): Promise<Chain[]> {
    const res = await fetch("http://localhost:8080/api/chains");
    if (!res.ok) throw new Error("Failed to fetch chains");
    return res.json();
}