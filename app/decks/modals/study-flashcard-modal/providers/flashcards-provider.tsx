import React, { createContext, useContext, useState, ReactNode } from "react";
import { useGetFlashcards } from "../hooks";
import { DeckInterface } from "@/app/decks/interfaces/deck.interface";

interface StudyFlashcardsData {
  flashcards: {
    id: number;
    frontMessage: string;
    backMessage: string;
  }[];
  isLoadingFlashcards: boolean;
  allFlashcardsStudied: boolean;

  isAnswerShowingUp: boolean;
  setIsAnswerShowingUp: (value: boolean) => void;

  flashcardsCount: number;
  handleFlashcardsCount: (value?: number) => void;

  setDifficulty: (value: string) => void;
  difficulty: string;
}

interface StudyFlashcardsProvider {
  children: ReactNode;
  deck: DeckInterface | null;
}

const StudyFlashcardsContext = createContext<StudyFlashcardsData | undefined>(
  undefined
);

export function StudyFlashcardsProvider({
  children,
  deck,
}: StudyFlashcardsProvider) {
  const { flashcards = [], isLoadingFlashcards } = useGetFlashcards(deck);
  const [isAnswerShowingUp, setIsAnswerShowingUp] = useState(false);
  const [flashcardsCount, setFlashcardsCount] = useState(0);
  const [difficulty, setDifficulty] = useState("1");

  const handleFlashcardsCount = (value?: number) => {
    if (allFlashcardsStudied) return;
    if (!!value || value === 0) setFlashcardsCount(value);
    else setFlashcardsCount((flashcardsCount) => flashcardsCount + 1);
  };

  const allFlashcardsStudied = flashcardsCount === flashcards?.length;

  const contextValue: StudyFlashcardsData = {
    difficulty,
    setDifficulty,

    allFlashcardsStudied,
    flashcards,
    isLoadingFlashcards,

    isAnswerShowingUp,
    setIsAnswerShowingUp,

    flashcardsCount,
    handleFlashcardsCount,
  };

  return (
    <StudyFlashcardsContext.Provider value={contextValue}>
      {children}
    </StudyFlashcardsContext.Provider>
  );
}

export function useStudyFlashcardsContext() {
  const context = useContext(StudyFlashcardsContext);

  if (!context) {
    throw new Error(
      "useStudyFlashcardsContext must be used within a MyProvider"
    );
  }
  return context;
}
