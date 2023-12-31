import { Text, Icon, Spinner, Tooltip, Flex } from "@chakra-ui/react";

import { BiInfoCircle } from "react-icons/bi";
import { DeckInterface } from "../interfaces/deck.interface";
import { useGetFlashcardsCounter } from "../hooks/use-get-flashcards-counter";

export default function DeckInfo({ deck }: { deck: DeckInterface }) {
  const { flashcardsCounter, isLoadingFlashcardsCounter } =
    useGetFlashcardsCounter(deck);

  return (
    <>
      <Tooltip
        label={
          <>
            {isLoadingFlashcardsCounter ? (
              <Spinner />
            ) : (
              <>
                <Text>Easy: {flashcardsCounter?.flashcardsEasy}</Text>
                <Text>Normal: {flashcardsCounter?.flashcardsNormal}</Text>
                <Text>Hard: {flashcardsCounter?.flashcardsHard}</Text>
              </>
            )}
          </>
        }
      >
        <Flex>
          <BiInfoCircle size="16px" />
        </Flex>
      </Tooltip>
    </>
  );
}
