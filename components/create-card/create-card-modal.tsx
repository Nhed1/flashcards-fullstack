import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Deck } from "../decks/decks";

interface CreateCardModal {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck | null;
}

export function CreateCardModal({
  isOpen = false,
  onClose,
  deck,
}: CreateCardModal) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new card inside {deck?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Hello world</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
