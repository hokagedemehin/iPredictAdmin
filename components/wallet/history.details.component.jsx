import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

const HistoryDescription = ({ isOpen, onClose, rowInfo }) => {
  // console.log("rowInfo", rowInfo);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {rowInfo?.fullName} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Lorem count={2} /> */}

          {rowInfo.type == 'Buy Coins' && (
            <Text className=' font-semibold'>
              User bought {rowInfo?.coins} coins on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Claim Free Coins' && (
            <Text className=' font-semibold'>
              User claimed their free {rowInfo?.coins} coins on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Match Prediction' && (
            <Text className=' font-semibold'>
              User spent {rowInfo?.coins} coins to predict matches on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Start Trivia Quiz' && (
            <Text className=' font-semibold'>
              User spent {rowInfo?.coins} coins to play a trivia game on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Trivia Game Reward' && (
            <Text className=' font-semibold'>
              User won &#8358;{rowInfo?.money} from a trivia game they played on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'New Registration' && (
            <Text className=' font-semibold'>
              User registered on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Registration Referral' && (
            <Text className=' font-semibold'>
              A new user registered using {rowInfo?.fullName} referral link on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'User Login' && (
            <Text className=' font-semibold'>
              User logged in on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'User Logout' && (
            <Text className=' font-semibold'>
              User logged out on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Withdrawal Request' && (
            <Text className=' font-semibold'>
              User placed a withdrawal request of &#8358;{rowInfo?.money} on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Withdrawal Payment' && (
            <Text className=' font-semibold'>
              User was paid &#8358;{rowInfo?.money} on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Profile Update' && (
            <Text className=' font-semibold'>
              User updated their profile on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Magazine Subscription' && (
            <Text className=' font-semibold'>
              User subscribed for magazine with {rowInfo?.coins} coins on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Buy Card' && (
            <Text className=' font-semibold'>
              User bought {rowInfo?.activity} card with {rowInfo?.coins} coins
              on {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'User Card Reward' && (
            <Text className=' font-semibold'>
              User sent his team card reward of {rowInfo?.money} to his wallet
              on {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'User Match Reward' && (
            <Text className=' font-semibold'>
              User won {rowInfo?.money} for playing a match on thier{' '}
              {rowInfo?.activity} card on
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Play Match User Card' && (
            <Text className=' font-semibold'>
              User Played the match on their {rowInfo?.activity} card on{' '}
              {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
          {rowInfo.type == 'Fund User Card' && (
            <Text className=' font-semibold'>
              User funded their {rowInfo?.activity} card with {rowInfo?.coins}
              on {moment(rowInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          )}
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

export default HistoryDescription;
