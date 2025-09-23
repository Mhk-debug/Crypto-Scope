export async function getGlobalData() {
    const res = await fetch(
        "https://api.coingecko.com/api/v3/global",
    );

    return res.json();
}