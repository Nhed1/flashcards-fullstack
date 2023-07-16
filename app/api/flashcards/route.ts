import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "../db";
import { NextApiRequestWithFormData } from "../(types)/next-api-request-with-form-data";

interface Flashcard {
  frontMessage: string;
  backMessage: string;
  deckId: number;
}

export async function GET(req: NextApiRequestWithFormData) {
  const { deckId } = req.body;

  try {
    const flashcards = await prisma.flashcard.findMany({
      where: { deckId },
    });

    if (!flashcards || flashcards.length === 0) {
      return new Response("Decks not found", { status: 404 });
    }

    return new Response(JSON.stringify(flashcards));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
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
