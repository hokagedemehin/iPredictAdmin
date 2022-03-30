import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';

import AllHistories from './histories.component';
import AllUsers from './users.component';
import WithdrawComponent from './withdraw.component';

const WalletHomePage = () => {
  return (
    <div className=''>
      <div className='mb-5 flex flex-col space-y-10'>
        <div className='buy w-full rounded-xl bg-purple-700 py-5 px-2 shadow-lg ring-1 ring-gray-200 '>
          <Tabs isFitted variant='unstyled' colorScheme='teal'>
            <TabList mb='1rem'>
              <Tab
                _selected={{ color: 'white', bg: 'purple.700' }}
                className='rounded-full font-bold text-white'
              >
                All Users
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'purple.700' }}
                className='rounded-full font-bold text-white'
              >
                History
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'purple.700' }}
                className='rounded-full font-bold text-white'
              >
                Withdrawals
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                  <AllUsers />
                </div>
              </TabPanel>
              <TabPanel>
                <AllHistories />
              </TabPanel>
              <TabPanel>
                <WithdrawComponent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WalletHomePage;

/******<div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                25 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N100
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                60 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N200
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                150 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N500
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                350 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N1000
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ring-1 shadow-md shadow-black px-3 sm:px-5 py-5 sm:py-7 rounded-md bg-purple-800 cursor-pointer hover:bg-purple-600 transform transition duration-200 ease-in hover:scale-105'>
              <Image
                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                src='/logo/coins.png'
                alt="user's profile"
                fallbackSrc='https://via.placeholder.com/30?text=user'
              />
              <Text className='text-white sm:text-xl font-semibold'>
                1800 Coins
              </Text>
              <div className='px-6 py-1 ring-1 bg-white font-bold rounded-lg sm:text-xl'>
                N5000
              </div>
            </div> */
