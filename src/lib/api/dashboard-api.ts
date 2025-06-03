export async function fetchOverview() {
    const res = await fetch("http://localhost:8080/api/dashboard/overview");
    if (!res.ok) throw new Error("Failed to fetch overview");
    return res.json();
}