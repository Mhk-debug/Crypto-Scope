import CoinsTable from "@/components/home/CoinsTable";
import { Flex, Heading, Link, Text, Highlight } from "@chakra-ui/react";
import NextLink from "next/link";
import { getAllCoins } from "../Lib/GetAllCoins";
import { getGlobalData } from "../Lib/GetGlobalData";
import formatLargeNumber from "../Lib/FormatLargeNumbers";
import CoinsPagination from "@/components/home/CoinsPagination";

type Props = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Home({ searchParams }: Props) {
    const searchParameters = await searchParams;

    const page = searchParameters.page || "1";

    const coinsData = await getAllCoins(page);

    const globalData = await getGlobalData();

    if (!globalData || !globalData.data) {
        throw new Error("Failed to fetch global data");
    }

    if (!coinsData) {
        return <Text>No Currencies found</Text>;
    }

    const changeInMarketCap =
        globalData.data.market_cap_change_percentage_24h_usd ?? 0;

    const marketCapUsd = globalData?.data?.total_market_cap?.usd ?? 0;
    const formattedMarketCap = formatLargeNumber(marketCapUsd);

    return (
        <>
            <Heading size="4xl">All Cryptocurrencies</Heading>
            <Text fontSize="lg" mt={2}>
                Made by{" "}
                <Text as="span" color="yellow.500" fontWeight="bold">
                    Min Hein Ko
                </Text>{" "}
                | Powered by{" "}
                <Link
                    fontWeight="bold"
                    color="teal.500"
                    _hover={{ textDecoration: "underline" }}
                    as={NextLink}
                    href="https://www.coingecko.com/"
                >
                    CoinGecko
                </Link>
            </Text>
            <Flex mt={2} align="center" gap={4} w="fit-content">
                <Text color="gray.500">
                    The global market cap is ${formattedMarketCap}
                </Text>
                <Flex align="center" gap={2}>
                    {changeInMarketCap > 0 ? (
                        <Text color="green.600">
                            +{changeInMarketCap.toFixed(2)}%
                        </Text>
                    ) : (
                        <Text color="red.500">
                            {changeInMarketCap.toFixed(2)}%
                        </Text>
                    )}
                    <Text fontSize="sm" color="gray.500">
                        in the last 24 hours
                    </Text>
                </Flex>
            </Flex>
            <CoinsTable coins={coinsData} />
            <CoinsPagination
                count={globalData.data.active_cryptocurrencies}
                pageSize={100}
                defaultPage={Number(page)}
            />
        </>
    );
}
