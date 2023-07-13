"use client";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Deck } from "./decks";

export default function Deck({
  deck,
  onOpen,
}: {
  deck: Deck;
  onOpen: () => void;
}) {
  return (
    <Card w="800px" border="1px">
      <Flex justify="space-between" align="center" px="10">
        <CardHeader>
          <Heading size="md">{deck.name}</Heading>
        </CardHeader>

        <ButtonGroup variant="solid" colorScheme="cyan" spacing="2">
          <Button onClick={onOpen}>add card</Button>
          <Button>study deck</Button>
        </ButtonGroup>
      </Flex>
    </Card>
  );
}
