"use client";

import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <Box>
            <Heading mb={4}>Something went wrong!</Heading>
            <Text mb={4}>{error.message}</Text>
            <Button onClick={() => reset()} colorPalette="teal">
                Try again
            </Button>
        </Box>
    );
}

export default Error;
