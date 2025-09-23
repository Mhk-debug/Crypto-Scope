"use client";

import {
    Button,
    ClientOnly,
    Flex,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    Link,
    Skeleton,
    Text,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
    const colorMode = useColorModeValue("gray.200", "gray.800");
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const router = useRouter();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!search.trim()) {
            return;
        }
        setSearching(true);
        const currencyNameFormat = search.toLowerCase().replace(/\s+/g, "-");
        router.push(`/crypto/${currencyNameFormat}`);
        setSearching(false)
    }

    return (
        <ClientOnly
            fallback={
                <Flex my={4} align="center" justify="space-between">
                    <Skeleton display="block" w="48" h={12} />
                </Flex>
            }
        >
            <Flex
                borderBottom="2px solid"
                borderColor={colorMode}
                mb={6}
                py={6}
                justify="space-between"
                align="center"
            >
                <Link as={NextLink} href="/">
                    <Heading size="3xl">Crypto Scope</Heading>
                </Link>
                <HStack align="center" spaceX={4}>
                    <ColorModeButton />
                    <form onSubmit={handleSubmit}>
                        <HStack spaceX={2}>
                            <InputGroup
                                maxW="80"
                                display="flex"
                                startElement={
                                    <Icon size="md">
                                        <LuSearch />
                                    </Icon>
                                }
                            >
                                <Input
                                    size="lg"
                                    placeholder="Search currencies"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </InputGroup>
                            <Button type="submit" loading={searching}>
                                Search
                            </Button>
                        </HStack>
                    </form>
                </HStack>
            </Flex>
        </ClientOnly>
    );
}

export default Navbar;
