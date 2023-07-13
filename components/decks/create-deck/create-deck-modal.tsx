import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateDeck } from "../hooks/useCreateDeck";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface CreateDeckModal {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDeckModal({ isOpen = false, onClose }: CreateDeckModal) {
  const queryClient = useQueryClient();

  const [deckName, setDeckName] = useState("");
  const { createDeck, status } = useCreateDeck({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries(["get-decks"]);
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>create new deck</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="deck name"
            onChange={(e) => setDeckName(e.target.value)}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={status === "loading"}
            loadingText="submitting"
            colorScheme="teal"
            variant="outline"
            onClick={() => createDeck(deckName)}
          >
            submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
