"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { Text } from "@chakra-ui/react"

type SparklineAreaChartProps = {
    data: { time: number; price: number }[];
    priceChange: number;
};

const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);

const formatDayHour = (timestamp: number) =>
    new Intl.DateTimeFormat("en-US", {
        weekday: "short", // Mon, Tue, Wed...
        hour: "numeric",
        hour12: true,
    }).format(new Date(timestamp));

function SparklineAreaChart({ data, priceChange }: SparklineAreaChartProps) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            {data.length > 0 ? (
            <AreaChart data={data}>
                <XAxis
                    dataKey="time"
                    tickFormatter={formatDayHour}
                    tickMargin={10}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    domain={["auto", "auto"]}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    labelFormatter={(timestamp: number) =>
                        formatDayHour(timestamp)
                    }
                    formatter={(value) => [
                        formatPrice(value as number),
                        "Price",
                    ]}
                />
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke={priceChange >= 0 ? "#2F855A" : "#C53030"}
                    fill={priceChange >= 0 ? "#C6F6D5" : "#FEB2B2"}
                />
            </AreaChart>
            ) : (
                <Text>-</Text>
            )}
        </ResponsiveContainer>
    );
}

export default SparklineAreaChart;
