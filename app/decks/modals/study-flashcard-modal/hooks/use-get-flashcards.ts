import { useQuery } from "@tanstack/react-query";
import { DeckInterface } from "../../../interfaces/deck.interface";

interface Flashcard {
  frontMessage: string;
  backMessage: string;
  id: number;
  difficulty: number;
}

export const useGetFlashcards = (deck: DeckInterface | null) => {
  const handleFlashcards = async () => {
    const params = new URLSearchParams();

    if (deck?.id) {
      params.append("deckId", String(deck?.id));
    }

    const res = await fetch(`/api/flashcards?${params}`);
    return res.json();
  };

  const {
    data: flashcards,
    isLoading: isLoadingFlashcards,
    isError,
  } = useQuery<Flashcard[]>({
    queryKey: ["get-flashcards", deck?.id],
    queryFn: handleFlashcards,
  });

  return {
    flashcards,
    isLoadingFlashcards,
    isError,
  };
};
