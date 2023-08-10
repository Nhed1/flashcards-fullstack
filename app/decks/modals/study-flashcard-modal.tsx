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
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetFlashcards } from "./hooks/use-get-flashcards";
import { DifficultyFlashcard } from "./components/difficulty-flashcard";

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
  console.log(allFlashcardsStudied);

  const handleCount = () => {
    if (allFlashcardsStudied) return;
    setCount((count) => count + 1);
  };

  const [difficulty, setDifficulty] = useState("1");

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
      {!isLoadingFlashcards && (
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

              {isAnswerShowingUp && (
                <DifficultyFlashcard
                  setDifficulty={setDifficulty}
                  difficulty={difficulty}
                />
              )}
            </Flex>
          </ModalBody>
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
