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
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetFlashcards } from "./hooks/use-get-flashcards";

interface CreateCardModal {
  isOpen: boolean;
  onClose: () => void;
  deck: DeckInterface | null;
}

export function StudyFlashcardModal({
  isOpen = false,
  onClose,
  deck,
}: CreateCardModal) {
  const {
    flashcards = [],
    isError,
    isLoadingFlashcards,
  } = useGetFlashcards(deck);
  const [count, setCount] = useState(0);

  const allFlashcardsStudied = count === flashcards?.length;

  const handleCount = () => {
    if (allFlashcardsStudied) return;
    setCount((count) => count + 1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCount(0);
        onClose();
      }}
      isCentered
    >
      <ModalOverlay />
      {isLoadingFlashcards && <Spinner />}
      {!isLoadingFlashcards && flashcards.length > 0 && (
        <ModalContent>
          <ModalHeader>
            <Text display="flex" gap="8px">
              Study deck {deck?.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {allFlashcardsStudied && <Text>No more flashcards to study</Text>}
            <Flex flexDirection="column" gap="18px">
              <Text>{flashcards[count]?.frontMessage}</Text>
              <Text>{flashcards[count]?.backMessage}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {!allFlashcardsStudied && (
              <Button onClick={handleCount}>Next flashcard</Button>
            )}
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
