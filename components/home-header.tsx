import { Flex, Heading } from "@chakra-ui/react";
import { UserButton } from "@clerk/nextjs";

export default function HomeHeader() {
  return (
    <Flex
      position="sticky"
      top="0"
      justify="space-between"
      p="3"
      pr="10"
      backgroundColor={"cyan.100"}
      w="100%"
    >
      <Heading size="lg">Flashcards APP</Heading>

      <UserButton showName />
    </Flex>
  );
}