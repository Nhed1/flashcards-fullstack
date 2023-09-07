import { useMutation } from "@tanstack/react-query";

export const useDeleteDeck = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const handleDeck = async (deck: { id?: string }) => {
    const res = await fetch(`/api/decks/${deck?.id}`, {
      method: "DELETE",
    });

    return res.json();
  };

  const { mutate: deleteDeck, isLoading: isLoadingDeleteDeck } = useMutation({
    mutationFn: (deck: { id?: string }) => handleDeck(deck),
    onSuccess,
    onError,
  });

  return {
    deleteDeck,
    isLoadingDeleteDeck,
  };
};
