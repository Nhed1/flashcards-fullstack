import { useMutation } from "@tanstack/react-query";

export const useCreateDeck = () => {
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

  const { mutate: createDeck, status } = useMutation({
    mutationFn: (deckName: string) => createNewDeck(deckName),
  });

  return {
    createDeck,
    status,
  };
};
