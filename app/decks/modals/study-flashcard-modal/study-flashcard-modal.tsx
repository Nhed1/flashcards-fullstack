import { DeckInterface } from "@/app/decks/interfaces/deck.interface";
import {
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { FlashcardBody } from "./flashcard-body";

import { useGetFlashcards, useUpdateFlashcard } from "./hooks";

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
  const { flashcards = [], isLoadingFlashcards } = useGetFlashcards(deck);
  const [isAnswerShowingUp, setIsAnswerShowingUp] = useState(false);
  const [count, setCount] = useState(0);
  const [difficulty, setDifficulty] = useState("1");

  const handleCount = () => {
    if (allFlashcardsStudied) return;
    setCount((count) => count + 1);
  };

  const allFlashcardsStudied = count === flashcards?.length;

  const { updateFlashcard, isLoadingFlashcardUpdate } = useUpdateFlashcard();

  return (
    <Modal
      size="md"
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
      {!isLoadingFlashcards && (
        <ModalContent>
          <ModalHeader>
            <Text display="flex" gap="8px">
              Study {deck?.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <FlashcardBody
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            allFlashcardsStudied={allFlashcardsStudied}
            count={count}
            flashcards={flashcards}
            isAnswerShowingUp={isAnswerShowingUp}
            setIsAnswerShowingUp={setIsAnswerShowingUp}
          />
          <ModalFooter>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {!allFlashcardsStudied && (
                <Button
                  isDisabled={!isAnswerShowingUp}
                  onClick={() => {
                    updateFlashcard({
                      ...flashcards[count],
                      difficulty,
                    });
                    handleCount();
                    setIsAnswerShowingUp(false);
                  }}
                >
                  Next flashcard
                </Button>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
