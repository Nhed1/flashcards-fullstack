import { prisma } from "../db";
import { NextApiRequestWithFormData } from "../(types)/next-api-request-with-form-data";
import {} from "next/server";

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

export async function GET(req: NextApiRequestWithFormData) {
  const deckId = req.nextUrl.searchParams.get("deckId");

  if (!deckId) return new Response("Deck id not provided", { status: 400 });

  const flashcards = await prisma.flashcard.findMany({
    where: {
      id: Number(deckId),
    },
  });

  return new Response(JSON.stringify(flashcards));
}
