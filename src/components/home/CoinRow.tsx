"use client";

import {
    Flex,
    Table,
    Image,
    Text,
    Box,
    Icon,
    Link,
    ClientOnly,
    Skeleton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useColorModeValue } from "../ui/color-mode";
import CoinGraph from "./CoinGraph";

type CoinRowProps = {
    coin: Record<string, any>;
};

function CoinRow({ coin }: CoinRowProps) {
    const colorMode = useColorModeValue("gray.100", "gray.900");

    const coin24hChange =
        Math.round(coin?.price_change_percentage_24h * 100) / 100;

    const prices = coin?.sparkline_in_7d.price;

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];

    const priceChange = lastPrice - firstPrice;

    const data = prices.map((price: number, index: number) => ({
        time: index,
        price,
    }));

    return (
        <ClientOnly
            fallback={
                <Table.Row>
                    <Table.Cell>
                        <Skeleton
                            display="block"
                            mx="auto"
                            h="16"
                            w="full"
                            my={4}
                        />
                    </Table.Cell>
                </Table.Row>
            }
        >
            <Table.Row _hover={{ bg: `${colorMode}` }} py={2} overflow="hidden">
                <Table.Cell>{coin?.market_cap_rank || "-"}</Table.Cell>
                <Table.Cell>
                    <Link
                        outline="none"
                        as={NextLink}
                        w="full"
                        href={`/crypto/${coin.id}`}
                    >
                        <Flex flexWrap="wrap" align="center" gap={2}>
                            <Image w="7" src={coin.image} alt={coin.name} />
                            <Text>{coin?.name || "-"}</Text>
                            <Text fontSize="sm" color="gray.500">
                                {coin?.symbol || "-"}
                            </Text>
                        </Flex>
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    {coin?.current_price
                        ? `$${coin.current_price.toLocaleString()}`
                        : "-"}
                </Table.Cell>
                <Table.Cell>
                    <Text
                        color={
                            coin24hChange !== undefined &&
                            coin24hChange !== null
                                ? coin24hChange >= 0
                                    ? "green.600"
                                    : "red.500"
                                : "gray.500"
                        }
                    >
                        <Icon>
                            {coin24hChange !== undefined &&
                            coin24hChange >= 0 ? (
                                <FaCaretUp />
                            ) : (
                                <FaCaretDown />
                            )}
                        </Icon>
                        {coin24hChange !== undefined
                            ? `${Math.abs(coin24hChange)}%`
                            : "-"}
                    </Text>
                </Table.Cell>
                <Table.Cell>
                    <Text>
                        {coin?.total_volume !== undefined &&
                        coin.total_volume !== null
                            ? `$${coin.total_volume.toLocaleString()}`
                            : "-"}
                    </Text>
                </Table.Cell>
                <Table.Cell>
                    <Text>
                        {coin?.market_cap
                            ? `$${coin.market_cap.toLocaleString()}`
                            : "-"}
                    </Text>
                </Table.Cell>
                <Table.Cell px={0}>
                    <Box w="100%" h="50px" overflow="hidden">
                        <CoinGraph data={data} priceChange={priceChange} />
                    </Box>
                </Table.Cell>
            </Table.Row>
        </ClientOnly>
    );
}

export default CoinRow;
