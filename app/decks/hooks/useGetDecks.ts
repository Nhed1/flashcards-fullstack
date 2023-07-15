import { useQuery } from "@tanstack/react-query";
import { DeckInterface } from "../interfaces/deck.interface";

export const useGetDecks = () => {
  const getDecks = async () => {
    const res = await fetch("/api/decks");
    return res.json();
  };

  const { data: decks, isLoading: isLoadingDecks } = useQuery<DeckInterface[]>({
    queryKey: ["get-decks"],
    queryFn: getDecks,
  });

  return {
    decks,
    isLoadingDecks,
  };
};
