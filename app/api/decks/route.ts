import { prisma } from "../db";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const decks = await prisma.deck.findMany();

    if (!decks) {
      return res.status(404).json({ error: "Decks not found" });
    }

    return res.status(200).json({ decks });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function POST(
  req: NextApiRequestWithFormData,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const { name }: { name: string } = await req.json();

  if (!userId) return res.status(401).json({ error: "unauthorized" });

  const deck = await prisma.deck.create({
    data: {
      name,
      userId,
    },
  });

  return res.status(200).json({ deck });
}
