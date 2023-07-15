import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "../db";
import { NextApiRequestWithFormData } from "../(types)/next-api-request-with-form-data";

interface Flashcard {
  frontMessage: string;
  backMessage: string;
  deckId: number;
}

export async function GET() {
  const decks = await prisma.deck.findMany();

  return decks;
}

export async function POST(req: NextApiRequestWithFormData) {
  const { userId } = getAuth(req);
  const flashcard: Flashcard = await req.json();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const newFlashcard = await prisma.flashcard.create({
    data: {
      deckId: flashcard.deckId,
      backMessage: flashcard.backMessage,
      frontMessage: flashcard.frontMessage,
    },
  });

  return new Response(JSON.stringify(newFlashcard));
}
