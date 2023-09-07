"use client";

import {
  Flex,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetDecks } from "./hooks/use-get-decks";
import { DeckInterface } from "./interfaces/deck.interface";
import { CreateFlashcardModal } from "./modals/create-flashcard-modal/create-flashcard-modal";
import Deck from "./deck";
import { StudyFlashcardContainer } from "./modals/study-flashcard-modal";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { useDeleteDeck } from "./hooks/use-delete-deck";
import { useQueryClient } from "@tanstack/react-query";

export type IModalType = "addCard" | "studyCard" | "deleteDeck";

export default function DecksTable() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { deleteDeck } = useDeleteDeck({
    onSuccess: () => {
      queryClient.invalidateQueries(["get-decks"]);

      toast({
        position: "top-right",
        title: "Deck deleted !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        position: "top-right",
        title: "Something went wrong !",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const { decks, isLoadingDecks, isError } = useGetDecks();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalType, setModalType] = useState<IModalType>("addCard");

  const [deckOpened, setDeckOpened] = useState<DeckInterface | null>(null);

  const modals = {
    addCard: (
      <CreateFlashcardModal
        isOpen={isOpen}
        onClose={onClose}
        deck={deckOpened}
      />
    ),
    studyCard: (
      <StudyFlashcardContainer
        deck={deckOpened}
        onClose={onClose}
        isOpen={isOpen}
      />
    ),
    deleteDeck: (
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        actionTitle="Confirm"
        action={() => {
          deleteDeck({ id: String(deckOpened?.id) });
          onClose();
        }}
        title="Delete deck"
        description="this action will delete all flashcards inside this deck"
      />
    ),
  };

  if (isError) throw new Error("decks not found");

  const Decks = () => {
    if (!decks || decks.length === 0)
      return <Text>{"You don't have any decks"}</Text>;

    return decks?.map((deck) => (
      <Deck
        key={deck.id}
        deck={deck}
        onOpen={(type: IModalType) => {
          setModalType(type);

          onOpen();
          setDeckOpened(deck);
        }}
      />
    ));
  };

  return (
    <>
      <Flex gap="4" flexDirection="column" alignItems="center">
        {isLoadingDecks ? <Spinner /> : <Decks />}
      </Flex>
      {isOpen && modals[modalType]}
    </>
  );
}
