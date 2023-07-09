"use client";

import { Spinner } from "@chakra-ui/react";
import CreateDeck from "./create-deck";
import DecksContainer from "./decks-container";
import { useQuery } from "@tanstack/react-query";

export default function Decks() {
  const getDecks = async () => {
    const decks = await fetch("/api/decks");
    return decks;
  };
  const {
    data: decks,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["get-decks"], queryFn: getDecks });

  console.log(decks?.body);
  return (
    <>
      <CreateDeck />
      {/* {isLoading ? </Spinner> :  */}
    </>
  );
}
