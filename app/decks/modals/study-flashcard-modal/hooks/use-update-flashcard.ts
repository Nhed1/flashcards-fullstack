import { useMutation } from "@tanstack/react-query";

interface FlashcardInterface {
  id: number;
  difficulty: string;
}

export const useUpdateFlashcard = () => {
  const handleFlashcards = async (flashcard: FlashcardInterface) => {
    const res = await fetch(`/api/flashcards/${flashcard?.id}`, {
      method: "PUT",
      body: JSON.stringify({
        difficulty: flashcard?.difficulty,
      }),
    });

    return res.json();
  };

  const { mutate: updateFlashcard, isLoading: isLoadingFlashcardUpdate } =
    useMutation({
      mutationFn: (flashcard: FlashcardInterface) =>
        handleFlashcards(flashcard),
    });

  return {
    updateFlashcard,
    isLoadingFlashcardUpdate,
  };
};
