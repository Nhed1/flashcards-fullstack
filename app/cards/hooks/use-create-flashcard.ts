import { useMutation } from "@tanstack/react-query";

interface Flashcard {
  frontMessage: string;
  backMessage: string;
  deckId: number;
}

export const useCreateFlashcard = () => {
  const createNewCard = async (flashcard: Flashcard) => {
    await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flashcard),
    });
  };

  const {
    mutate: createFlashcard,
    status,
    ...props
  } = useMutation({
    mutationFn: (flashcard: Flashcard) => createNewCard(flashcard),
  });

  return {
    createFlashcard,
    status,
    ...props,
  };
};
