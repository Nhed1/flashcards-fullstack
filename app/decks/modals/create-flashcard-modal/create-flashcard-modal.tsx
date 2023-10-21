import { DeckInterface } from "@/app/decks/interfaces/deck.interface";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateFlashcard } from "./hooks";
import { TextEditor } from "@/components/text-editor";
import { WordsTagsToLearn } from "../../components/words-tags-to-learn";

interface CreateCardModal {
  isOpen: boolean;
  onClose: () => void;
  deck: DeckInterface | null;
}

export function CreateFlashcardModal({
  isOpen = false,
  onClose,
  deck,
}: CreateCardModal) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [selectedFrontTexts, setSelectedFrontTexts] = useState<string[]>([]);

  const toast = useToast();

  const { createFlashcard, status } = useCreateFlashcard({
    onSuccess: () => {
      toast({
        position: "top-right",
        title: "Flashcard created !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        position: "top-right",
        title: "Something went wrong !",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text display="flex" gap="8px">
            Create flashcard in
            <Text color="purple.500">{deck?.name || ""}</Text>
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap="18px">
            <TextEditor
              dependencyValue={status}
              key={1}
              value={front}
              placeholder="front of the flashcard"
              onChange={(value) => setFront(value)}
              setBoldTexts={setSelectedFrontTexts}
            />
            <WordsTagsToLearn selectedFrontTexts={selectedFrontTexts} />
            <TextEditor
              dependencyValue={status}
              key={2}
              isBoldShowing={false}
              value={back}
              placeholder="back of the flashcard"
              onChange={(value) => setBack(value)}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={
              !front || front === "<p></p>" || !back || back === "<p></p>"
            }
            loadingText="submitting"
            colorScheme="purple"
            variant="outline"
            isLoading={status === "loading"}
            onClick={() => {
              setFront("");
              setBack("");
              createFlashcard({
                frontMessage: front,
                backMessage: back,
                deckId: deck!.id,
              });
            }}
          >
            submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
