import { NextApiRequestWithFormData } from "../../(types)/next-api-request-with-form-data";
import { prisma } from "../../db";

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
