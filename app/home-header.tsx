import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { UserButton } from "@clerk/nextjs";

export default function HomeHeader() {
  return (
    <Flex
      position="sticky"
      top="0"
      justify="space-between"
      alignItems="center"
      p="3"
      pr="10"
      backgroundColor="blackAlpha.800"
      textColor="gray.100"
      w="100%"
    >
      <Box>
        <Heading size="lg">Learnly Cards</Heading>
        <Text fontSize="small">flashcards application to learn English</Text>
      </Box>
      <UserButton />
    </Flex>
  );
}
