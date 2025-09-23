export default async function getCoinInfo(coinId: string) {
    const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true&community_data=false&developer_data=false`
    );
    return res.json();
}
