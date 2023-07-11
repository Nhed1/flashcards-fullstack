"use client";

import { Spinner, Stack } from "@chakra-ui/react";

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
    <Stack spacing="4" mt="10">
      {isLoading ? (
        <Spinner />
      ) : (
        decks?.map((deck) => <Deck key={deck.id} deck={deck} />)
      )}
    </Stack>
  );
}
