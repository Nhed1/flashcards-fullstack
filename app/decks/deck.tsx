"use client";

import {
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { DeckInterface } from "./interfaces/deck.interface";
import { IModalType } from "./decks-table";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Deck({
  deck,
  onOpen,
}: {
  deck: DeckInterface;
  onOpen: (type: IModalType) => void;
}) {
  return (
    <Card w={{ base: "90%", md: "300px", lg: "500px" }} variant="elevated">
      <Flex justify="space-between" align="center" px="2">
        <CardHeader>
          <Heading size="md" wordBreak="break-word">
            {deck.name}
          </Heading>
        </CardHeader>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={() => onOpen("studyCard")}>
              study flashcard
            </MenuItem>
            <MenuItem onClick={() => onOpen("addCard")}>
              create flashcard
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Card>
  );
}
