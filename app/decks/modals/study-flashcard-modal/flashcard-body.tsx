import { Button, Flex, ModalBody, Text } from "@chakra-ui/react";
import { DifficultyFlashcard } from "./difficulty-flashcard";
import { useStudyFlashcardsContext } from "./providers/flashcards-provider";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { useSpeakText } from "./hooks/use-speak-text";
import { getBoldTextHtml } from "@/app/utils/getBoldTextHtml";
import { WordsTagsToLearn } from "../../components/words-tags-to-learn";

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

  const { speakText } = useSpeakText();

  const tags = getBoldTextHtml(flashcards[flashcardsCount]?.frontMessage);

  return (
    <ModalBody>
      {allFlashcardsStudied && <Text>No more flashcards to study</Text>}
      {!allFlashcardsStudied && (
        <Flex flexDirection="column" gap="18px">
          <Button
            gap="6px"
            variant="outline"
            width="fit-content"
            onClick={() => speakText(flashcards[flashcardsCount]?.frontMessage)}
          >
            <BsFillVolumeUpFill size="20px" />
          </Button>
          <Text
            dangerouslySetInnerHTML={{
              __html: flashcards[flashcardsCount]?.frontMessage,
            }}
          />

          <WordsTagsToLearn selectedFrontTexts={tags} />

          <Button
            display={
              isAnswerShowingUp || allFlashcardsStudied ? "none" : "block"
            }
            onClick={() => setIsAnswerShowingUp(true)}
          >
            show answer
          </Button>
          <Text
            display={isAnswerShowingUp ? "block" : "none"}
            dangerouslySetInnerHTML={{
              __html: flashcards[flashcardsCount]?.backMessage,
            }}
          />

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
