"use client";

import Decks from "@/components/decks/decks";
import { Flex } from "@chakra-ui/react";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <Flex justify="center" flexDirection="column" alignItems="center" w="100%">
      <Flex justify="end" p="3" pr="10" backgroundColor={"cyan.100"} w="100%">
        <UserButton showName />
      </Flex>
      <Decks />
    </Flex>
  );
}
