import { Table } from "@chakra-ui/react";
import React from "react";
import CoinRow from "./CoinRow";

type CoinsTableProps = {
    coins: Array<Record<string, any>>;
};

function CoinsTable({ coins }: CoinsTableProps) {
    return (
        <Table.Root mt={6} size="lg" width="100%">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>#</Table.ColumnHeader>
                    <Table.ColumnHeader>Coin</Table.ColumnHeader>
                    <Table.ColumnHeader>Price</Table.ColumnHeader>
                    <Table.ColumnHeader>24h</Table.ColumnHeader>
                    <Table.ColumnHeader>24h Volume</Table.ColumnHeader>
                    <Table.ColumnHeader>Market Cap</Table.ColumnHeader>
                    <Table.ColumnHeader>Last 7 Days</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {coins && coins.length > 0 && (
                    coins.map((coin) => <CoinRow key={coin.id} coin={coin} />)
                )}
            </Table.Body>
        </Table.Root>
    );
}

export default CoinsTable;
