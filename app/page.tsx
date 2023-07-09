"use client";

import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
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
      <UserButton showName />
      <input
        className="border-black"
        type="text"
        onChange={(e) => setDeckName(e.target.value)}
      />
      <button onClick={handleNewDeck}>Create new deck</button>
    </>
  );
}
