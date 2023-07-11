"use client";

import { Button, Card, CardHeader, Flex, Heading } from "@chakra-ui/react";

interface Deck {
  name: string;
  id: number;
  createdAt: Date;
}

export default function Deck({ deck }: { deck: Deck }) {
  return (
    <Card w="800px" border="1px">
      <Flex justify="space-between" px="10">
        <CardHeader>
          <Heading size="md">{deck.name}</Heading>
        </CardHeader>

        <Flex justify="center" align="center" gap="1">
          <Button colorScheme="cyan" variant="outline">
            add card
          </Button>
          <Button colorScheme="cyan" variant="outline">
            study card
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
