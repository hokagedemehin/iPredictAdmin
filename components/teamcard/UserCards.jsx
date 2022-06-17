import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const UserCardsComponent = ({ isOpen, onClose, card }) => {
  // console.log(card);
  const userMatches = card?.user_cards?.data;

  const sortedCard = userMatches?.sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Subscribed Users</DrawerHeader>

          <DrawerBody>
            <div className='space-y-4'>
              {sortedCard?.length > 0 &&
                sortedCard?.map((match) => (
                  <div
                    key={match?.id}
                    className='relative h-fit w-[17rem] overflow-hidden rounded-md shadow-md'
                  >
                    <div className='bg-gray-100 py-1 text-center'>
                      <Text className='text-base font-bold capitalize'>
                        {match?.attributes?.firstName}{' '}
                        {match?.attributes?.lastName}
                      </Text>
                      <Text>{match?.attributes?.email}</Text>
                    </div>
                  </div>
                ))}
            </div>
            {sortedCard?.length === 0 && (
              <div className='flex flex-col items-center justify-center'>
                <div className='relative flex  h-80 w-full'>
                  <Image
                    src='/emptycanvas/newsmagazine.png'
                    layout='fill'
                    objectFit='contain'
                    // placeholder='blur'
                    alt='Empty Previous Matches'
                  />
                </div>
                <Text className='text-center text-lg font-semibold text-gray-400'>
                  No subscribed user
                </Text>
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserCardsComponent;
