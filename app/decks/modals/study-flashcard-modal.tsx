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
  const [isAnswerShowingUp, setIsAnswerShowingUp] = useState(false);

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
        setIsAnswerShowingUp(false);
      }}
      isCentered
    >
      <ModalOverlay />
      {isLoadingFlashcards && <Spinner />}
      {!isLoadingFlashcards && flashcards.length > 0 && (
        <ModalContent>
          <ModalHeader>
            <Text display="flex" gap="8px">
              Study {deck?.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {allFlashcardsStudied && <Text>No more flashcards to study</Text>}
            <Flex flexDirection="column" gap="18px">
              <Text>{flashcards[count]?.frontMessage}</Text>

              <Button
                display={
                  isAnswerShowingUp || allFlashcardsStudied ? "none" : "block"
                }
                onClick={() => setIsAnswerShowingUp(true)}
              >
                show answer
              </Button>
              <Text display={isAnswerShowingUp ? "block" : "none"}>
                {flashcards[count]?.backMessage}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {!allFlashcardsStudied && (
              <Button
                onClick={() => {
                  handleCount();
                  setIsAnswerShowingUp(false);
                }}
              >
                Next flashcard
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
