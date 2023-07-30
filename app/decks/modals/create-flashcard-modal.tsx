import { DeckInterface } from "@/app/decks/interfaces/deck.interface";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateFlashcard } from "./hooks/use-create-flashcard";

interface CreateCardModal {
  isOpen: boolean;
  onClose: () => void;
  deck: DeckInterface | null;
}

export function CreateFlashcardModal({
  isOpen = false,
  onClose,
  deck,
}: CreateCardModal) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const { createFlashcard, status } = useCreateFlashcard();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text display="flex" gap="8px">
            Create card inside <Text color="teal">{deck?.name || ""}</Text>
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap="18px">
            <Textarea
              placeholder="front card"
              onChange={(e) => setFront(e.target.value)}
            />
            <Textarea
              placeholder="back card"
              onChange={(e) => setBack(e.target.value)}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={!front || !back}
            loadingText="submitting"
            colorScheme="teal"
            variant="outline"
            isLoading={status === "loading"}
            onClick={() =>
              createFlashcard({
                frontMessage: front,
                backMessage: back,
                deckId: deck!.id,
              })
            }
          >
            submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
