"use client";

import { Button, VStack, useDisclosure } from "@chakra-ui/react";

import { CreateDeckModal } from "./create-deck/create-deck-modal";
import DecksTable from "./decks-table";

export default function DecksContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack mt="10" gap="8">
      <Button variant="solid" onClick={onOpen}>
        add new deck
      </Button>
      <DecksTable />
      <CreateDeckModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}
