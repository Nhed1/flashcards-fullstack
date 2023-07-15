import { useMutation } from "@tanstack/react-query";

interface Flashcard {
  frontMessage: string;
  backMessage: string;
}

export const useCreateFlashcard = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const createNewCard = async ({ frontMessage, backMessage }: Flashcard) => {
    await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        frontMessage,
        backMessage,
      }),
    });
  };

  const {
    mutate: createFlashcard,
    status,
    ...props
  } = useMutation({
    mutationFn: (flashcard: Flashcard) => createNewCard(flashcard),
    onSuccess,
  });

  return {
    createFlashcard,
    status,
    ...props,
  };
};
