"use client";

import { Flex, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useGetDecks } from "./hooks/use-get-decks";
import { DeckInterface } from "./interfaces/deck.interface";
import { CreateFlashcardModal } from "./modals/create-flashcard-modal/create-flashcard-modal";
import Deck from "./deck";
import { StudyFlashcardContainer } from "./modals/study-flashcard-modal";

export type IModalType = "addCard" | "studyCard";

export default function DecksTable() {
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
  };

  if (isError) throw new Error("decks not found");

  return (
    <>
      <Flex gap="4" flexDirection="column" alignItems="center">
        {isLoadingDecks ? (
          <Spinner />
        ) : (
          decks?.map((deck) => (
            <Deck
              key={deck.id}
              deck={deck}
              onOpen={(type: IModalType) => {
                setModalType(type);

                onOpen();
                setDeckOpened(deck);
              }}
            />
          ))
        )}
      </Flex>
      {modals[modalType]}
    </>
  );
}
