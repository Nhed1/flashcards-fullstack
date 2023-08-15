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
import { useQueryClient } from "@tanstack/react-query";
import { useCreateDeck } from "./hooks";

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

  console.log(deckName);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>create deck</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="deck name"
            onChange={(e) => setDeckName(e.target.value)}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={deckName === ""}
            isLoading={status === "loading"}
            loadingText="submitting"
            colorScheme="purple"
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
