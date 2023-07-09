import { prisma } from "../db";

export async function GET(req: Request, res: Response) {
  const flashcards = await prisma.flashcard.findMany();

  return flashcards;
}
