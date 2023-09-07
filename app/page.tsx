"use client";

import { Flex } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import HomeHeader from "./home-header";

export default function Home() {
  return (
    <Flex
      justify="center"
      flexDirection="column"
      alignItems="center"
      w="100%"
      h="100%"
      backgroundColor="gray.200"
      overflow="hidden"
    >
      <HomeHeader style={{ position: "absolute" }} />
      <SignIn />
    </Flex>
  );
}
