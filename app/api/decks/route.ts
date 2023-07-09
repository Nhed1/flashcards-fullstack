import { prisma } from "../db";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };

export async function GET() {
  try {
    const decks = await prisma.deck.findMany();

    if (!decks || decks.length === 0) {
      return new Response("Decks not found", { status: 404 });
    }

    return new Response(JSON.stringify(decks));
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}

export async function POST(req: NextApiRequestWithFormData) {
  const { userId } = getAuth(req);
  const { name }: { name: string } = await req.json();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const deck = await prisma.deck.create({
    data: {
      name,
      userId,
    },
  });

  return new Response(JSON.stringify(deck));
}
