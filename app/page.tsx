"use client";

import DecksContainer from "@/components/decks/decks-container";
import HomeHeader from "@/components/home-header";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex justify="center" flexDirection="column" alignItems="center" w="100%">
      <HomeHeader />
      <DecksContainer />
    </Flex>
  );
}
