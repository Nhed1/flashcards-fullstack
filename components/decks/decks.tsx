"use client";

import {
  Button,
  Spinner,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { CreateCardModal } from "../create-card/create-card-modal";
import { useState } from "react";
import { useGetDecks } from "./hooks/useGetDecks";
import Deck from "./deck";
import { DeckInterface } from "./interfaces/deck.interface";

export default function Decks() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deckOpened, setDeckOpened] = useState<DeckInterface | null>(null);
  const { decks, isLoadingDecks } = useGetDecks();

  return (
    <VStack mt="10" gap="8">
      <Button variant="solid">add new deck</Button>
      <Stack spacing="4">
        {isLoadingDecks ? (
          <Spinner />
        ) : (
          decks?.map((deck) => (
            <Deck
              key={deck.id}
              deck={deck}
              onOpen={() => {
                onOpen();
                setDeckOpened(deck);
              }}
            />
          ))
        )}
      </Stack>
      <CreateCardModal isOpen={isOpen} onClose={onClose} deck={deckOpened} />
    </VStack>
  );
}
