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
import { FlashcardBody } from "./flashcard-body";

import { useUpdateFlashcard } from "./hooks";
import { useStudyFlashcardsContext } from "./providers/flashcards-provider";

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
    allFlashcardsStudied,
    isLoadingFlashcards,
    isAnswerShowingUp,
    handleFlashcardsCount,
    setIsAnswerShowingUp,
    flashcards,
    difficulty,
    flashcardsCount,
  } = useStudyFlashcardsContext();

  const { updateFlashcard, isLoadingFlashcardUpdate } = useUpdateFlashcard();
  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onClose={() => {
        handleFlashcardsCount(0);
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
          <FlashcardBody />
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
                      ...flashcards[flashcardsCount],
                      difficulty,
                    });
                    handleFlashcardsCount();
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
