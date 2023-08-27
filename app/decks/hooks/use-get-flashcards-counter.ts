import { useQuery } from "@tanstack/react-query";
import { DeckInterface } from "../interfaces/deck.interface";

export interface FlashcardsCounter {
  flashcardsHard: number;
  flashcardsEasy: number;
  flashcardsNormal: number;
}

export const useGetFlashcardsCounter = (deck: DeckInterface) => {
  const getFlashcardsCounter = async () => {
    const params = new URLSearchParams();

    if (deck?.id) {
      params.append("deckId", String(deck?.id));
    }

    const res = await fetch(`/api/flashcards/counter?${params}`);

    return res.json();
  };

  const {
    data: flashcardsCounter,
    isLoading: isLoadingFlashcardsCounter,
    isError,
  } = useQuery<FlashcardsCounter>({
    queryKey: ["get-flashcards-counter", deck.id],
    queryFn: getFlashcardsCounter,
  });

  return {
    flashcardsCounter,
    isLoadingFlashcardsCounter,
    isError,
  };
};
