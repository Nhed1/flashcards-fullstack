export interface Flashcard {
  frontMessage: string;
  backMessage: string;
  deckId: number;
  difficulty: number;
  updatedAt: Date | null;
}
