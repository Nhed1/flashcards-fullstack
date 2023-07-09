import { prisma } from "../db";

export async function GET(req: Request, res: Response) {
  const decks = await prisma.deck.findMany();

  return decks;
}
