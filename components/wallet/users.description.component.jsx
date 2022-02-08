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

const UsersDescription = ({ isOpen, onClose, rowInfo }) => {
  console.log('rowInfo', rowInfo);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {' '}
          {rowInfo?.firstName} {rowInfo?.lastName}{' '}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className=''>
            <div className='text-gray-700'>
              {/* <div className='grid grid-cols-2 text-sm'> */}
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>First Name</div>
                <div className=' py-2'>{rowInfo?.firstName}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Last Name</div>
                <div className=' py-2'>{rowInfo?.lastName}</div>
              </div>
              {/* </div> */}

              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Phone No.</div>
                <div className=' py-2'>{rowInfo?.phoneNo}</div>
              </div>

              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Email.</div>
                <div className=' py-2'>{rowInfo?.email}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Birthday</div>
                <div className=' py-2'>{rowInfo?.birthDay}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Coins</div>
                <div className=' py-2'>{rowInfo?.coins}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Money</div>
                <div className=' py-2'>{rowInfo?.money}</div>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UsersDescription;
