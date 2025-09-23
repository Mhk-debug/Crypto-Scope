import { Heading, Table } from "@chakra-ui/react";
import React from "react";

type MarketDataTableProps = {
    MarketCap: number | null;
    TotalVolume: number | null;
    CirculatingSupply: number | null;
    TradingVolume24h: number | null;
    TotalSupply: number | null;
    MaxSupply: number | null;
    High24h: number | null;
    Low24h: number | null;
};

function MarketDataTable({
    MarketCap,
    TotalSupply,
    TotalVolume,
    CirculatingSupply,
    MaxSupply,
    High24h,
    Low24h,
}: MarketDataTableProps) {
    return (
        <>
            <Heading textAlign="center">Market Info</Heading>
            <Table.Root size="lg">
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign="start">Market Cap</Table.Cell>
                        <Table.Cell textAlign="end">
                            {MarketCap !== null && MarketCap !== undefined
                                ? `$${MarketCap.toLocaleString()}`
                                : "-"}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="start">Total Supply</Table.Cell>
                        <Table.Cell textAlign="end">
                            {TotalSupply !== null && TotalSupply !== undefined
                                ? `${TotalSupply.toLocaleString()}`
                                : "-"}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="start">
                            Circulating Supply
                        </Table.Cell>
                        <Table.Cell textAlign="end">
                            {CirculatingSupply !== null &&
                            CirculatingSupply !== undefined
                                ? `${CirculatingSupply.toLocaleString()}`
                                : "-"}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="start">Max Supply</Table.Cell>
                        <Table.Cell textAlign="end">
                            {MaxSupply !== null && MaxSupply !== undefined
                                ? `${MaxSupply.toLocaleString()}`
                                : "-"}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="start">Total Volume</Table.Cell>
                        <Table.Cell textAlign="end">
                            {TotalVolume !== null && TotalVolume !== undefined
                                ? `${TotalVolume.toLocaleString()}`
                                : "-"}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="start">High 24h</Table.Cell>
                        <Table.Cell textAlign="end">
                            {High24h !== null && High24h !== undefined
                                ? `$${High24h.toLocaleString()}`
                                : "-"}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign="start">Low 24h</Table.Cell>
                        <Table.Cell textAlign="end">
                            {Low24h !== null && Low24h !== undefined
                                ? `$${Low24h.toLocaleString()}`
                                : "-"}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </>
    );
}

export default MarketDataTable;
