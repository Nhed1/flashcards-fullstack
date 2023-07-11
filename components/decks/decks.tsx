"use client";

import { Button, HStack, Spinner, Stack, VStack } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import Deck from "./deck";

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

  return (
    <VStack mt="10" gap="8">
      <Button variant="solid">add new deck</Button>

      <Stack spacing="4">
        {isLoading ? (
          <Spinner />
        ) : (
          decks?.map((deck) => <Deck key={deck.id} deck={deck} />)
        )}
      </Stack>
    </VStack>
  );
}
