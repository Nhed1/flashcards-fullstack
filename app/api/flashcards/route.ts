import { prisma } from "../db";
import { NextApiRequestWithFormData } from "../(types)/next-api-request-with-form-data";

interface Flashcard {
  frontMessage: string;
  backMessage: string;
  deckId: number;
}

export async function POST(req: NextApiRequestWithFormData) {
  const flashcard: Flashcard = await req.json();

  const newFlashcard = await prisma.flashcard.create({
    data: {
      deckId: flashcard.deckId,
      backMessage: flashcard.backMessage,
      frontMessage: flashcard.frontMessage,
    },
  });

  return new Response(JSON.stringify(newFlashcard));
}
