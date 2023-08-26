import { NextApiRequestWithFormData } from "../../(types)/next-api-request-with-form-data";
import { prisma } from "../../db";

export async function DELETE(
  req: NextApiRequestWithFormData,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  console.log(id);

  try {
    const deleteFlashcards = prisma.flashcard.deleteMany({
      where: {
        deckId: id,
      },
    });

    const deleteDeck = prisma.deck.delete({
      where: { id },
    });

    const transaction = await prisma.$transaction([
      deleteFlashcards,
      deleteDeck,
    ]);

    return new Response(JSON.stringify(transaction));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
