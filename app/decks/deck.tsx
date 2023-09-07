"use client";

import {
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { DeckInterface } from "./interfaces/deck.interface";
import { IModalType } from "./decks-table";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDeleteDeck } from "./hooks/use-delete-deck";
import { useQueryClient } from "@tanstack/react-query";
import DeckInfo from "./components/deck-info";

export default function Deck({
  deck,
  onOpen,
}: {
  deck: DeckInterface;
  onOpen: (type: IModalType) => void;
}) {
  const queryClient = useQueryClient();

  const { deleteDeck } = useDeleteDeck({
    onSuccess: () => {
      queryClient.invalidateQueries(["get-decks"]);
    },
  });

  return (
    <Card
      key={deck.id}
      w={{ base: "100%", md: "500px", lg: "600px" }}
      variant="elevated"
      backgroundColor="whiteAlpha.600"
    >
      <Flex justify="space-between" align="center" px="2">
        <CardHeader>
          <Flex justifyContent="center" alignItems="center" gap="8px">
            <DeckInfo deck={deck} key={deck.id} />

            <Heading size="md" wordBreak="break-word">
              {deck.name}
            </Heading>
          </Flex>
        </CardHeader>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={() => onOpen("studyCard")}>study deck</MenuItem>
            <MenuItem onClick={() => onOpen("addCard")}>
              create flashcard
            </MenuItem>
            <MenuItem onClick={() => deleteDeck({ id: String(deck.id) })}>
              delete deck
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Card>
  );
}
