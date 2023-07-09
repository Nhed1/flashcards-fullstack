"use client";

import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function CreateDeck() {
  const [deckName, setDeckName] = useState("");

  const handleNewDeck = async () => {
    await fetch("/api/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: deckName,
      }),
    });
  };

  return (
    <>
      <Input
        className="border-black"
        placeholder="deck name"
        onChange={(e) => setDeckName(e.target.value)}
      />
      <Button onClick={handleNewDeck} colorScheme="teal" variant="solid">
        create new deck
      </Button>
    </>
  );
}
