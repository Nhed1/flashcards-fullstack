"use client";

import { Button, VStack, useDisclosure } from "@chakra-ui/react";

import { CreateDeckModal } from "./create-deck/create-deck-modal";
import DecksTable from "./decks-table";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import { useEffect } from "react";

export default function DecksContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getFlashcards = async () => {
    const res = await fetch("/api/flashcards/1");

    console.log(res);
  };

  return (
    <VStack mt="10" gap="8">
      <Button variant="solid" onClick={onOpen}>
        add new deck
      </Button>
      <Button onClick={getFlashcards}>Teste</Button>
      <ErrorBoundary fallback={<Error />}>
        <DecksTable />
      </ErrorBoundary>
      <CreateDeckModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}
