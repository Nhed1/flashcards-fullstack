import { Button, Flex, ModalBody, Text } from "@chakra-ui/react";
import { DifficultyFlashcard } from "./difficulty-flashcard";
import { useStudyFlashcardsContext } from "./providers/flashcards-provider";
import { useSpeechSynthesis } from "react-speech-kit";
import { BsFillVolumeUpFill } from "react-icons/bs";

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

  const { speak, voices } = useSpeechSynthesis();

  const englishVoice = voices[1];

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
              speak({
                text: flashcards[flashcardsCount]?.frontMessage,
                voice: englishVoice,
              })
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
