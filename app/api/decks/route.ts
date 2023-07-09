import { prisma } from "../db";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const decks = await prisma.deck.findMany();

  return decks;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  console.log(userId);

  if (!userId) return res.status(401).json({ error: "unauthorized" });

  const deck = await prisma.deck.create({
    data: {
      userId,
    },
  });

  console.log(deck);

  return res.status(200).json({ deck });
}
