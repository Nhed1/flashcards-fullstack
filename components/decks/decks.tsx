"use client";

import {
  Button,
  Spinner,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import Deck from "./deck";
import { CreateCardModal } from "../create-card/create-card-modal";
import { useState } from "react";

export interface Deck {
  name: string;
  id: number;
  createdAt: Date;
}

export default function Decks() {
  const getDecks = async () => {
    const res = await fetch("/api/decks");
    return res.json();
  };

  const { data: decks, isLoading } = useQuery<Deck[]>({
    queryKey: ["get-decks"],
    queryFn: getDecks,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deckOpened, setDeckOpened] = useState<Deck | null>(null);

  return (
    <VStack mt="10" gap="8">
      <Button variant="solid">add new deck</Button>
      <Stack spacing="4">
        {isLoading ? (
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
