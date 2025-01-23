import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import EntryPageModal from '../EntryPageModal';


const ConfirmModal = ({ isOpen, onClose }) => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent gap='12px'>
          <ModalHeader>
            <Text textAlign='center' fontWeight='400'>
              To proceed with your request, please log in. Would you like to log
              in now?
            </Text>
          </ModalHeader>
          <ModalFooter justifyContent='space-evenly'>
            <Button onClick={onClose}>Cancle</Button>
            <Button
              colorScheme='orange'
              onClick={() => {
                onClose();
                onLoginOpen();
              }}
            >
              Yes, Log In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <EntryPageModal onClose={onLoginClose} isOpen={isLoginOpen} />
    </>
  );
};

export default ConfirmModal;
