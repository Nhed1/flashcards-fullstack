import { Flashcard } from "../(types)";
import dayjs from "dayjs";

const DIFFICULTY = {
  Hard: 3,
  Normal: 2,
  Easy: 1,
};

const FIVE_DAYS = 5;

export const filterFlashcardsByDifficulty = (flashcards: Flashcard[]) => {
  const flashcardsByDifficulty = flashcards.filter((flashcard) => {
    if (!flashcard.updatedAt) return flashcard;

    if (flashcard.difficulty === DIFFICULTY.Hard) {
      return flashcard;
    }

    if (flashcard.difficulty === DIFFICULTY.Normal) {
      const flashcardUpdatedAt = dayjs(flashcard.updatedAt);
      if (flashcardUpdatedAt.isAfter(dayjs(), "day")) {
        return flashcard;
      }
    }

    if (flashcard.difficulty === DIFFICULTY.Easy) {
      const flashcardUpdatedAt = dayjs(flashcard.updatedAt);
      if (flashcardUpdatedAt.diff(dayjs(), "day") >= FIVE_DAYS) {
        console.log(flashcardUpdatedAt.diff(dayjs(), "day") >= FIVE_DAYS);
        return flashcard;
      }
    }
  });

  return flashcardsByDifficulty;
};
