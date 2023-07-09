import Decks from "@/components/decks/decks";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <UserButton showName />
      <Decks />
    </>
  );
}
