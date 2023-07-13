"use client";

import { Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import { CreateCardModal } from "../create-card/create-card-modal";
import { useState } from "react";
import { useGetDecks } from "./hooks/useGetDecks";
import { DeckInterface } from "./interfaces/deck.interface";
import Deck from "./deck";

export default function DecksTable() {
  const { decks, isLoadingDecks } = useGetDecks();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deckOpened, setDeckOpened] = useState<DeckInterface | null>(null);

  return (
    <>
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
    </>
  );
}
