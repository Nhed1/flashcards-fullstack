"use client";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";

interface Deck {
  name: string;
  id: number;
  createdAt: Date;
}

export default function Deck({ deck }: { deck: Deck }) {
  return (
    <Card w="800px" border="1px">
      <Flex justify="space-between" align="center" px="10">
        <CardHeader>
          <Heading size="md">{deck.name}</Heading>
        </CardHeader>

        <ButtonGroup variant="solid" colorScheme="cyan" spacing="2">
          <Button>add card</Button>
          <Button>study deck</Button>
        </ButtonGroup>
      </Flex>
    </Card>
  );
}
