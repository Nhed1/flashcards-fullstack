"use client";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { DeckInterface } from "./interfaces/deck.interface";
import { IModalType } from "./decks-table";

export default function Deck({
  deck,
  onOpen,
}: {
  deck: DeckInterface;
  onOpen: (type: IModalType) => void;
}) {
  return (
    <Card w="800px" border="1px">
      <Flex justify="space-between" align="center" px="10">
        <CardHeader>
          <Heading size="md">{deck.name}</Heading>
        </CardHeader>

        <ButtonGroup variant="solid" colorScheme="cyan" spacing="2">
          <Button onClick={() => onOpen("addCard")}>add card</Button>
          <Button onClick={() => onOpen("studyCard")}>study deck</Button>
        </ButtonGroup>
      </Flex>
    </Card>
  );
}
