import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { RadioGroup } from '@headlessui/react';

const MatchUpdate = ({ isOpen, onClose, result, setResult, confirmResult }) => {
  const handleChange = (val) => {
    setResult({ ...result, result: val });
  };

  const handleSubmit = async () => {
    onClose();
    await confirmResult();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Match Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='bg-gray-100'>
            <RadioGroup
              value={result.result}
              onChange={handleChange}
              className='space-y-3'
            >
              {/* <RadioGroup.Label className='py-3 text-xl font-medium'>
                Result
              </RadioGroup.Label> */}
              <RadioGroup.Option value='home'>
                {({ checked }) => (
                  <span
                    className={`${
                      checked ? 'bg-blue-400 text-white' : ''
                    } relative flex cursor-pointer rounded-lg bg-white py-4 px-5 text-lg font-bold shadow-md focus:outline-none 
                `}
                  >
                    Home
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value='draw'>
                {({ checked }) => (
                  <span
                    className={`${
                      checked ? 'bg-blue-400 text-white' : ''
                    } relative flex cursor-pointer rounded-lg bg-white py-4 px-5 text-lg font-bold shadow-md focus:outline-none 
                `}
                  >
                    Draw
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value='away'>
                {({ checked }) => (
                  <span
                    className={`${
                      checked ? 'bg-blue-400 text-white' : ''
                    } relative flex cursor-pointer rounded-lg bg-white py-4 px-5 text-lg font-bold shadow-md focus:outline-none 
                `}
                  >
                    Away
                  </span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value='not played'>
                {({ checked }) => (
                  <span
                    className={`${
                      checked ? 'bg-blue-400 text-white' : ''
                    } relative flex cursor-pointer rounded-lg bg-white py-4 px-5 text-lg font-bold shadow-md focus:outline-none 
                `}
                  >
                    Not Played
                  </span>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='red'
              variant='outline'
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button colorScheme='teal' onClick={handleSubmit}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MatchUpdate;
