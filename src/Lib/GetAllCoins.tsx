export async function getAllCoins(page: string) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&page=${page}`);
    return res.json();
  }
  