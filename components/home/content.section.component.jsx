import React from 'react';
import {
  GiSoccerBall,
  GiCardPlay,
  GiCartwheel,
  GiNewspaper,
} from 'react-icons/gi';
import { BsNewspaper } from 'react-icons/bs';
import { MdOutlineQuiz } from 'react-icons/md';
import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { LinkBox, LinkOverlay } from "@chakra-ui/react";

const ContentComponent = () => {
  const router = useRouter();
  return (
    <div className='pt-16'>
      <div className='mx-4 grid grid-cols-2 gap-4 sm:grid-cols-3'>
        <div
          onClick={() => router.push('/predictandwin')}
          className='flex transform cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-white py-4 px-2 shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-gray-100 sm:py-6 sm:px-4'
        >
          <Icon as={GiSoccerBall} w={10} h={10} />

          <p className='text-center text-sm font-bold'>Predict & Win</p>
        </div>

        <div
          onClick={() => router.push('/news')}
          className='flex transform cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-white py-4 px-2 shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-gray-100 sm:py-6 sm:px-4'
        >
          <Icon as={BsNewspaper} w={10} h={10} />
          <p className='text-center text-sm font-bold'>News & Transfer</p>
        </div>

        <div
          onClick={() => router.push('/teamcard')}
          className='flex transform cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-white py-4 px-2 shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-gray-100 sm:py-6 sm:px-4'
        >
          <Icon as={GiCardPlay} w={10} h={10} />
          <p className='text-center text-sm font-bold'>Team Cards</p>
        </div>
        <div
          onClick={() => router.push('/triviagame')}
          className='flex transform cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-white py-4 px-2 shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-gray-100 sm:py-6 sm:px-4'
        >
          <Icon as={MdOutlineQuiz} w={10} h={10} />
          <p className='text-center text-sm font-bold'>Trivia Game</p>
        </div>

        <div
          onClick={() => router.push('/spinmatch')}
          className='flex transform cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-white py-4 px-2 shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-gray-100 sm:py-6 sm:px-4'
        >
          <Icon as={GiCartwheel} w={10} h={10} />
          <p className='text-center text-sm font-bold'>Spin Match Virtual</p>
        </div>
        <div
          onClick={() => router.push('/magazine')}
          className='flex transform cursor-pointer flex-col items-center justify-center space-y-2 rounded-md bg-white py-4 px-2 shadow-md transition duration-200 ease-in hover:scale-105 hover:bg-gray-100 sm:py-6 sm:px-4'
        >
          <Icon as={GiNewspaper} w={10} h={10} />
          <p className='text-center text-sm font-bold'>News Magazine</p>
        </div>
      </div>
      {/* <div className='mx-4 flex justify-center pt-10 pb-5'>
        <div
          onClick={() => router.push('/tutorials')}
          className='flex w-fit cursor-pointer items-center justify-center rounded-md border border-gray-400 px-6 py-4 text-center text-xl font-bold text-black transition duration-500 ease-in-out  hover:bg-black hover:text-white'
        >
          YouTube tutorial videos
        </div>
      </div> */}
    </div>
  );
};

export default ContentComponent;
