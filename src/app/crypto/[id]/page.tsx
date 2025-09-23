import MarketDataTable from "@/components/coinInfo/MarketDataTable";
import PriceChangeTable from "@/components/coinInfo/PriceChangeTable";
import SparklineAreaChart from "@/components/coinInfo/SparklineAreaChart";
import getCoinInfo from "@/Lib/GetCoinInfo";
import {
    Flex,
    Heading,
    Link,
    VStack,
    Image,
    Text,
    Badge,
    Stat,
    FormatNumber,
    HStack,
    Box,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

async function CoinInfoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const paramsData = await params;
    const coinId = paramsData.id;

    const coinData = await getCoinInfo(coinId);

    if (coinData?.error === "coin not found") {
        return (
            <VStack spaceY={1}>
                <Heading>This Coin does not exist</Heading>
                <Heading as="h2" size="md">
                    Please check the coin ID and try again.
                </Heading>
                <Link as={NextLink} colorPalette="blue" href="/">
                    Go To Home Page
                </Link>
            </VStack>
        );
    }
    if (!coinData || coinData.error || coinData.status?.error_message) {
        <VStack spaceY={1}>
            <Heading>TSomething went wrong</Heading>
            <Heading as="h2" size="md">
                Please try again later.
            </Heading>
            <Link as={NextLink} colorPalette="blue" href="/">
                Go To Home Page
            </Link>
        </VStack>;
    }

    const marketData = coinData.market_data;

    const price1MonthChange =
        Math.round(marketData?.price_change_percentage_30d * 100) / 100;

    const rawSparklineData: [number] = marketData?.sparkline_7d?.price;

    const firstPrice = rawSparklineData[0];
    const lastPrice = rawSparklineData[rawSparklineData.length - 1];

    const priceChange = lastPrice - firstPrice;

    const now = Date.now();
    const hourMs = 60 * 60 * 1000;

    const areaChartData = rawSparklineData.map((price, index) => ({
        time: now - (rawSparklineData.length - index) * hourMs,
        price,
    }));

    return (
        <>
            <Flex align="center" gap={2}>
                <Image
                    aspectRatio="square"
                    h="9"
                    src={coinData.image.large}
                    alt={coinData.name}
                />
                <Heading as="h1" size="3xl">
                    {coinData.name} ({coinData.symbol})
                </Heading>
                <Badge colorPalette="blue">
                    #{coinData.market_cap_rank || "-"}
                </Badge>
            </Flex>
            <Stat.Root mt={4}>
                <Stat.Label fontSize="md">Current Price</Stat.Label>
                <HStack>
                    <Stat.ValueText fontSize="2xl">
                        <FormatNumber
                            value={marketData?.current_price.usd || 0}
                            style="currency"
                            currency="USD"
                        />
                    </Stat.ValueText>
                    <Badge
                        size="md"
                        colorPalette={
                            price1MonthChange !== undefined &&
                            price1MonthChange !== null
                                ? price1MonthChange >= 0
                                    ? "green"
                                    : "red"
                                : "gray"
                        }
                        gap="0"
                    >
                        {price1MonthChange !== undefined &&
                        price1MonthChange !== null ? (
                            price1MonthChange >= 0 ? (
                                <Stat.UpIndicator />
                            ) : (
                                <Stat.DownIndicator />
                            )
                        ) : (
                            <Stat.DownIndicator />
                        )}
                        {Math.abs(price1MonthChange)}%
                    </Badge>
                </HStack>
                <Stat.HelpText fontSize="sm">since last month</Stat.HelpText>
            </Stat.Root>
            <Heading mt={5}>About {coinData.name}</Heading>
            <Text whiteSpace="pre-line">{`${coinData.description.en}`}</Text>
            <Box mt={6} p={4} rounded="lg">
                <Heading mb={2} textAlign="center">
                    Price Change in 7 days
                </Heading>
                {areaChartData.length === 0 && (
                    <Text textAlign="center" color="gray.500">
                        No data available for the last 7 days.
                    </Text>
                )}
                <SparklineAreaChart
                    data={areaChartData}
                    priceChange={priceChange}
                />
            </Box>
            <VStack mt={4} mb={12} spaceY="4">
                <PriceChangeTable
                    change_1h={
                        marketData.price_change_percentage_1h_in_currency.usd
                    }
                    change_24h={marketData.price_change_percentage_24h}
                    change_7d={marketData.price_change_percentage_7d}
                    change_30d={marketData.price_change_percentage_30d}
                    change_60d={marketData.price_change_percentage_60d}
                    change_200d={marketData.price_change_percentage_200d}
                    change_1y={marketData.price_change_percentage_1y}
                />
                <MarketDataTable
                    MarketCap={marketData.market_cap.usd}
                    TotalVolume={marketData.total_volume.usd}
                    TotalSupply={marketData.total_supply}
                    CirculatingSupply={marketData.circulating_supply}
                    MaxSupply={marketData.max_supply}
                    TradingVolume24h={marketData.usd_24h_vol}
                    High24h={marketData.high_24h.usd}
                    Low24h={marketData.low_24h.usd}
                />
            </VStack>
        </>
    );
}

export default CoinInfoPage;
