import { DeckInterface } from "@/app/decks/interfaces/deck.interface";

import { StudyFlashcardsProvider } from "./providers/flashcards-provider";
import { StudyFlashcardModal } from "./study-flashcard-modal";

interface StudyFlashcardContainer {
  isOpen: boolean;
  onClose: () => void;
  deck: DeckInterface | null;
}

export function StudyFlashcardContainer({
  isOpen = false,
  onClose,
  deck,
}: StudyFlashcardContainer) {
  return (
    <StudyFlashcardsProvider deck={deck}>
      <StudyFlashcardModal deck={deck} isOpen={isOpen} onClose={onClose} />
    </StudyFlashcardsProvider>
  );
}
