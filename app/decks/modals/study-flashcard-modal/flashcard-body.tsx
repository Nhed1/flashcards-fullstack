import { Button, Flex, ModalBody, Text } from "@chakra-ui/react";
import { DifficultyFlashcard } from "./difficulty-flashcard";
import { useStudyFlashcardsContext } from "./providers/flashcards-provider";

export function FlashcardBody() {
  const {
    allFlashcardsStudied,
    flashcards,
    flashcardsCount,
    isAnswerShowingUp,
    setIsAnswerShowingUp,
    difficulty,
    setDifficulty,
  } = useStudyFlashcardsContext();

  return (
    <ModalBody>
      {allFlashcardsStudied && <Text>No more flashcards to study</Text>}
      <Flex flexDirection="column" gap="18px">
        <Text>{flashcards[flashcardsCount]?.frontMessage}</Text>

        <Button
          display={isAnswerShowingUp || allFlashcardsStudied ? "none" : "block"}
          onClick={() => setIsAnswerShowingUp(true)}
        >
          show answer
        </Button>
        <Text display={isAnswerShowingUp ? "block" : "none"}>
          {flashcards[flashcardsCount]?.backMessage}
        </Text>

        {isAnswerShowingUp && (
          <DifficultyFlashcard
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
        )}
      </Flex>
    </ModalBody>
  );
}
