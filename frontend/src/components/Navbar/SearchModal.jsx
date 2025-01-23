import {
  Icon,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchModal = ({ isOpen, onClose, setSearchQuery, menuOptions }) => {
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <AutoComplete rollNavigation onChange={(e) => setSearchQuery(e)}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='inherit'
              fontSize='1.2em'
            >
              <Icon as={FaSearch} color='gray.300' />
            </InputLeftElement>

            <AutoCompleteInput
              variant='filled'
              placeholder='Search...'
              _focusVisible={{ borderColor: 'inherit' }}
              onKeyDown={handleEnter}
            />
          </InputGroup>

          <AutoCompleteList>
            {menuOptions.map((option, oid) => (
              <AutoCompleteItem
                key={`option-${oid}`}
                value={option}
                textTransform='capitalize'
                onClick={onClose}
              >
                {option}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
