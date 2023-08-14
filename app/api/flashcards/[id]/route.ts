import { NextApiRequestWithFormData } from "../../(types)/next-api-request-with-form-data";
import { prisma } from "../../db";

interface FlashcardUpdate {
  difficulty: string;
}

export async function GET(
  req: NextApiRequestWithFormData,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const flashcards = await prisma.flashcard.findMany({
      where: { deckId: id },
    });

    if (!flashcards || flashcards.length === 0) {
      return new Response("Decks not found", { status: 404 });
    }

    return new Response(JSON.stringify(flashcards[0]));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function PUT(
  req: NextApiRequestWithFormData,
  { params }: { params: { id: string } }
) {
  const flashcard: FlashcardUpdate = await req.json();
  const id = Number(params.id);
  const difficulty = Number(flashcard.difficulty);

  try {
    const flashcard = await prisma.flashcard.update({
      where: { id },
      data: {
        difficulty,
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(flashcard));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
