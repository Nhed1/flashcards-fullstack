import { useMutation } from "@tanstack/react-query";

export const useCreateDeck = ({ onSuccess }: { onSuccess: () => void }) => {
  const createNewDeck = async (deckName: string) => {
    await fetch("/api/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: deckName,
      }),
    });
  };

  const {
    mutate: createDeck,
    status,
    ...props
  } = useMutation({
    mutationFn: (deckName: string) => createNewDeck(deckName),
    onSuccess,
  });

  return {
    createDeck,
    status,
    ...props,
  };
};
