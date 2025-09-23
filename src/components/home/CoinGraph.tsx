import React from "react";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
import { Text } from "@chakra-ui/react"

type CoinGraphProps = {
    data: { time: number; price: number }[];
    priceChange: number;
};

function CoinGraph({data, priceChange}: CoinGraphProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            {data.length > 0 ? (
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={priceChange >= 0 ? "green" : "red"}
                        strokeWidth={2}
                        dot={false}
                    />
                    <YAxis hide domain={["dataMin - 0.5", "dataMax + 0.5"]} />
                </LineChart>
            ) : (
                <Text>-</Text>
            )}
        </ResponsiveContainer>
    );
}

export default CoinGraph;
