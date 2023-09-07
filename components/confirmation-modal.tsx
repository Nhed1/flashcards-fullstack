import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

interface ConfirmationModalProps {
  title: string;
  actionTitle: string;
  description?: string;
  action?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmationModal({
  title,
  description,
  action,
  actionTitle,
  isOpen,
  onClose,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{description}</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="purple" onClick={action}>
            {actionTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
