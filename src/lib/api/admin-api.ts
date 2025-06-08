import { API_BACKEND_URL } from "./config";

export async function fetchOverview() {
    const res = await fetch(`${API_BACKEND_URL}/admin/overview`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    if (!res.ok) {
        let errorMessage;
        try {
            const errorData = await res.json();
            errorMessage = errorData.message || JSON.stringify(errorData);
        } catch {
            errorMessage = await res.text();
        }

        throw new Error(`Failed to fetch overview: ${res.status} - ${errorMessage}`);
    }

    return res.json();
}
