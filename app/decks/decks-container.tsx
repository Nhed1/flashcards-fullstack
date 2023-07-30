"use client";

import { Button, VStack, useDisclosure } from "@chakra-ui/react";

import { CreateDeckModal } from "./modals/create-deck-modal";
import DecksTable from "./decks-table";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";

export default function DecksContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack mt="10" gap="8">
      <Button variant="solid" onClick={onOpen}>
        add new deck
      </Button>
      <ErrorBoundary fallback={<Error />}>
        <DecksTable />
      </ErrorBoundary>
      <CreateDeckModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}
