import {
  Button,
  Input,
  InputGroup,
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
import { InputLimit } from "@/components/input-limit";

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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>create deck</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputLimit
            value={deckName}
            limit={30}
            placeholder="deck name"
            onChange={(e) => setDeckName(e.target.value)}
          />
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
