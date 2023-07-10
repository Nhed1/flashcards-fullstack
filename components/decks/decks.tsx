"use client";

import { Card, CardHeader, Heading, Spinner, Stack } from "@chakra-ui/react";
import CreateDeck from "./create-deck";
import { useQuery } from "@tanstack/react-query";

interface Deck {
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
    <>
      <CreateDeck />
      <Stack spacing="4">
        {isLoading ? (
          <Spinner />
        ) : (
          decks?.map((deck) => (
            <Card key={deck.id} maxW="md">
              <CardHeader>
                <Heading size="md">{deck.name}</Heading>
              </CardHeader>
            </Card>
          ))
        )}
      </Stack>
    </>
  );
}
