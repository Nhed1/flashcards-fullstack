"use client";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const handleNewDeck = async () => {
    await fetch("/api/decks", {
      method: "POST",
    });
  };

  return (
    <>
      <UserButton showName />
      <button onClick={handleNewDeck}>Create new deck</button>
    </>
  );
}
