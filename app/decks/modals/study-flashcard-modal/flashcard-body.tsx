import { Button, Flex, ModalBody, Text } from "@chakra-ui/react";
import { DifficultyFlashcard } from "./difficulty-flashcard";
import { useStudyFlashcardsContext } from "./providers/flashcards-provider";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { useSpeakText } from "./hooks/use-speak-text";

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

  const { englishVoice, speakText } = useSpeakText();

  return (
    <ModalBody>
      {allFlashcardsStudied && <Text>No more flashcards to study</Text>}
      {!allFlashcardsStudied && (
        <Flex flexDirection="column" gap="18px">
          <Button
            gap="6px"
            variant="outline"
            width="fit-content"
            onClick={() =>
              speakText(flashcards[flashcardsCount]?.frontMessage, englishVoice)
            }
          >
            <BsFillVolumeUpFill size="20px" />
          </Button>
          <Text>{flashcards[flashcardsCount]?.frontMessage}</Text>

          <Button
            display={
              isAnswerShowingUp || allFlashcardsStudied ? "none" : "block"
            }
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
      )}
    </ModalBody>
  );
}
