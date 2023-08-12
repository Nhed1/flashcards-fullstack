import { Button, Flex, ModalBody, Text } from "@chakra-ui/react";
import { useState } from "react";
import { DifficultyFlashcard } from "./difficulty-flashcard";

interface FlashcardBody {
  allFlashcardsStudied: boolean;
  flashcards: {
    frontMessage: string;
    backMessage: string;
  }[];
  isAnswerShowingUp: boolean;
  count: number;
  setIsAnswerShowingUp: (value: boolean) => void;
  setDifficulty: (value: string) => void;
  difficulty: string;
}

export function FlashcardBody({
  difficulty,
  setDifficulty,
  allFlashcardsStudied,
  flashcards,
  isAnswerShowingUp,
  setIsAnswerShowingUp,
  count,
}: FlashcardBody) {
  return (
    <ModalBody>
      {allFlashcardsStudied && <Text>No more flashcards to study</Text>}
      <Flex flexDirection="column" gap="18px">
        <Text>{flashcards[count]?.frontMessage}</Text>

        <Button
          display={isAnswerShowingUp || allFlashcardsStudied ? "none" : "block"}
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
  );
}
