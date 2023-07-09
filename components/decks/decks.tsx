"use client";

import CreateDeck from "./create-deck";
import DecksContainer from "./decks-container";
import { useQuery } from "@tanstack/react-query";

export default function Decks() {
  const getDecks = async () => {
    const decks = await fetch("/api/decks");
    console.log(decks);
    return decks;
  };
  const query = useQuery({ queryKey: ["get-decks"], queryFn: getDecks });

  return (
    <>
      <CreateDeck />
      {/* <DecksContainer></DecksContainer> */}
    </>
  );
}
