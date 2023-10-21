import { Text, Spinner, Tooltip, Flex } from "@chakra-ui/react";

import { BiInfoCircle, BiSolidBookAlt } from "react-icons/bi";
import { DeckInterface } from "../interfaces/deck.interface";
import { useGetFlashcards } from "../modals/study-flashcard-modal/hooks";
import { BsFillCheckCircleFill } from "react-icons/bs";

type StatusType = { text: string; component: React.ReactElement };

export default function FlashcardsToLearnCounter({
  deck,
}: {
  deck: DeckInterface;
}) {
  const { flashcards = [], isLoadingFlashcards } = useGetFlashcards(deck);

  const flashcardsCounter = flashcards.length;

  const getStatus = (): StatusType => {
    if (isLoadingFlashcards)
      return { text: "loading", component: <Spinner size="14px" /> };
    if (flashcardsCounter > 0)
      return {
        text: `Flashcards to learn: ${flashcardsCounter}`,
        component: <BiSolidBookAlt size="14px" color="purple" />,
      };
    return {
      text: "No flashcards to learn",
      component: <BsFillCheckCircleFill size="14px" color="green" />,
    };
  };

  const statusType = getStatus();

  return (
    <>
      <Tooltip label={<Text>{statusType.text}</Text>}>
        <Flex>{statusType.component}</Flex>
      </Tooltip>
    </>
  );
}
