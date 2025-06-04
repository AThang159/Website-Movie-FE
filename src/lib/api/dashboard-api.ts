import { API_BASE_URL } from "./config";

export async function fetchOverview() {
    const res = await fetch(`${API_BASE_URL}/dashboard/overview`);
    if (!res.ok) throw new Error("Failed to fetch overview");
    return res.json();
}