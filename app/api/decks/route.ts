import { prisma } from "../db";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const decks = await prisma.deck.findMany();

  if (!decks) return res.status(400).json({ error: "not found" });

  return res.status(200).json({ decks });
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
