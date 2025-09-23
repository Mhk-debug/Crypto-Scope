"use client";

import { ButtonGroup, Flex, IconButton, Pagination } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type CoinsPaginationProps = {
    count: number;
    pageSize: number;
    defaultPage?: number;
};

function CoinsPagination({
    count,
    pageSize,
    defaultPage = 1,
}: CoinsPaginationProps) {
    const router = useRouter();
    return (
        <Flex my={8} justify="center" w="full">
            <Pagination.Root
                count={count}
                pageSize={pageSize}
                defaultPage={defaultPage}
                onPageChange={(page) => {
                    router.push(`/?page=${page.page}`)
                }}
            >
                <ButtonGroup variant="outline" size="sm">
                    <Pagination.PrevTrigger asChild>
                        <IconButton>
                            <LuChevronLeft />
                        </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                        render={(page) => (
                            <IconButton
                                variant={{
                                    base: "outline",
                                    _selected: "solid",
                                }}
                            >
                                {page.value}
                            </IconButton>
                        )}
                    />

                    <Pagination.NextTrigger asChild>
                        <IconButton>
                            <LuChevronRight />
                        </IconButton>
                    </Pagination.NextTrigger>
                </ButtonGroup>
            </Pagination.Root>
        </Flex>
    );
}

export default CoinsPagination;
