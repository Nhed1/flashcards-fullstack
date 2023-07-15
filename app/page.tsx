"use client";

import HomeHeader from "@/app/home-header";
import { Flex } from "@chakra-ui/react";
import DecksContainer from "./decks/decks-container";

export default function Home() {
  return (
    <Flex justify="center" flexDirection="column" alignItems="center" w="100%">
      <HomeHeader />
      <DecksContainer />
    </Flex>
  );
}
