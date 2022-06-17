import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import getFirebase from '../../utils/trivia/getFirebase';

const MainPageContent = () => {
  const router = useRouter();
  // const [strapi, setStrapi] = useState([])

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  const handleFirebase = async () => {
    await getFirebase();
  };

  return (
    <div>
      <div className='mx-4 flex flex-wrap items-center justify-center gap-4'>
        <div
          className='cursor-pointer rounded-lg px-10 py-4 text-center shadow-md '
          onClick={(e) => handleClick(e, '/triviagame/addquestion')}
        >
          <Text fontSize='xl' className='font-bold'>
            Add Question
          </Text>
        </div>
        <div
          className='cursor-pointer rounded-lg px-10 py-4 text-center shadow-md '
          onClick={(e) => handleClick(e, '/triviagame/questions')}
        >
          <Text fontSize='xl' className='font-bold'>
            View Questions
          </Text>
        </div>
        <div
          className='hidden cursor-pointer rounded-lg px-10 py-4 text-center shadow-md'
          onClick={async () => await handleFirebase()}
        >
          <Text fontSize='xl' className='font-bold'>
            Firebase
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;
