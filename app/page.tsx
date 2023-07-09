import CreateDeck from "@/components/decks/create-deck";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <UserButton showName />
      <CreateDeck />
    </>
  );
}
