import { Heading, Spinner, Center } from "@chakra-ui/react";
import React from "react";

function Loading() {
    return (
        <>
            <Center color="gray.600">
                <Heading mr={2}>Loading Page...</Heading>
                <Spinner />
            </Center>
        </>
    );
}

export default Loading;
