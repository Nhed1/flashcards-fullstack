import { DIFFICULTY } from "../(constants)";
import { NextApiRequestWithFormData } from "../../(types)/next-api-request-with-form-data";
import { prisma } from "../../db";

interface FlashcardsCounter {
  flashcardsHard: number;
  flashcardsNormal: number;
  flashcardsEasy: number;
}

export async function GET(req: NextApiRequestWithFormData) {
  const deckId = req.nextUrl.searchParams.get("deckId");

  if (!deckId) return new Response("Deck id not provided", { status: 400 });

  const flashcards = await prisma.flashcard.findMany({
    where: {
      deckId: Number(deckId),
    },
  });

  const flashcardsCounter = flashcards.reduce(
    (acc: FlashcardsCounter, flashcard) => {
      if (flashcard.difficulty === DIFFICULTY.Hard) {
        acc.flashcardsHard++;
      }
      if (flashcard.difficulty === DIFFICULTY.Normal) {
        acc.flashcardsNormal++;
      }
      if (flashcard.difficulty === DIFFICULTY.Easy) {
        acc.flashcardsEasy++;
      }

      return acc;
    },
    {
      flashcardsHard: 0,
      flashcardsNormal: 0,
      flashcardsEasy: 0,
    }
  );

  return new Response(JSON.stringify(flashcardsCounter));
}
