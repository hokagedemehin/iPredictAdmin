import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { BsCheckAll } from 'react-icons/bs';
import { FcProcess } from 'react-icons/fc';
import confirmPay from '../../utils/wallet/confirmPay';
const WithdrawalDescription = ({ isOpen, onClose, rowInfo }) => {
  // console.log('rowInfo', rowInfo);
  const [isLoading, setIsLoading] = useState(false);
  const paidUser = async () => {
    await confirmPay(setIsLoading, rowInfo);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {rowInfo?.fullName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className=''>
            <div className='text-gray-700'>
              {/* <div className='grid grid-cols-2 text-sm'> */}
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Full Name</div>
                <div className=' py-2'>{rowInfo?.fullName}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Account No</div>
                <div className=' py-2'>{rowInfo?.accountNumber}</div>
              </div>
              {/* </div> */}

              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Bank Name</div>
                <div className=' py-2'>{rowInfo?.bankName}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Amount</div>
                <div className=' py-2'>{rowInfo?.amount}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Phone No</div>
                <div className=' py-2'>{rowInfo?.phoneNumber}</div>
              </div>

              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Email.</div>
                <div className=' py-2'>{rowInfo?.email}</div>
              </div>
              <div className='flex'>
                {rowInfo?.transferred == 'yes' ? (
                  <Tag size='md' variant='subtle' colorScheme='green'>
                    <TagLeftIcon boxSize='15px' as={BsCheckAll} />
                    <TagLabel>successfull</TagLabel>
                  </Tag>
                ) : (
                  <Tag size='md' variant='subtle' colorScheme='red'>
                    <TagLeftIcon boxSize='15px' as={FcProcess} />
                    <TagLabel>Pending</TagLabel>
                  </Tag>
                )}
              </div>
              {/* <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Birthday</div>
                <div className=' py-2'>{rowInfo?.birthDay}</div>
              </div> */}
              {/* <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Coins</div>
                <div className=' py-2'>{rowInfo?.coins}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=' py-2 font-semibold'>Money</div>
                <div className=' py-2'>{rowInfo?.money}</div>
              </div> */}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' variant='outline' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme='teal'
            mr={3}
            isLoading={isLoading}
            loadingText='Processing...'
            spinnerPlacement='start'
            onClick={async () => await paidUser()}
            isDisabled={rowInfo?.transferred == 'yes'}
          >
            Mark as Paid
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawalDescription;
