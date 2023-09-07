import { useMutation } from "@tanstack/react-query";

interface Flashcard {
  frontMessage: string;
  backMessage: string;
  deckId: number;
}

export const useCreateFlashcard = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const createNewCard = async (flashcard: Flashcard) => {
    return await fetch("/api/flashcards", {
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
    onSuccess,
    onError,
  });

  return {
    createFlashcard,
    status,
    ...props,
  };
};
