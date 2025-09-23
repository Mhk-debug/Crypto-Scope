import { For, Icon, Table } from "@chakra-ui/react";
import React from "react";
import { FaCaretDown, FaCaretUp, FaQuestionCircle } from "react-icons/fa";

type PriceChangeTableProps = {
    change_1h: number | null;
    change_24h: number | null;
    change_7d: number | null;
    change_30d: number | null;
    change_60d: number | null;
    change_200d: number | null;
    change_1y: number | null;
};

function PriceChangeTable({
    change_1h,
    change_24h,
    change_7d,
    change_30d,
    change_60d,
    change_200d,
    change_1y,
}: PriceChangeTableProps) {
    const priceChanges = [
        change_1h,
        change_24h,
        change_7d,
        change_30d,
        change_60d,
        change_200d,
        change_1y,
    ];

    return (
        <Table.Root showColumnBorder rounded="lg" variant="outline" size="lg">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader textAlign="center">
                        1h
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">
                        24h
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">
                        7d
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">
                        30d
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">
                        60d
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">
                        200d
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center">
                        1y
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    {priceChanges.map((change, index) => (
                        <Table.Cell
                        key={index}
                            color={
                                change !== null && change !== undefined
                                    ? change >= 0
                                        ? "green.500"
                                        : "red.500"
                                    : "gray.500"
                            }
                            textAlign="center"
                        >
                            <Icon>
                                {change !== undefined &&
                                change !== null ? (
                                    change >= 0 ? (
                                        <FaCaretUp />
                                    ) : (
                                        <FaCaretDown />
                                    )
                                ) : (
                                    <FaQuestionCircle />
                                )}
                            </Icon>
                            {change !== null && change !== undefined
                                ? `${Math.abs(change).toFixed(2)}%`
                                : ""}
                        </Table.Cell>
                    ))}
                </Table.Row>
            </Table.Body>
        </Table.Root>
    );
}

export default PriceChangeTable;
