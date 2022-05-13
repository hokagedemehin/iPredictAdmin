import { Text } from '@chakra-ui/react';

import { useRouter } from 'next/router';
const NewPredictAndWinComponent = () => {
  const router = useRouter();

  // * This is the point where I will check if match select is empty, if it is empty
  //  * Once it is empty, upon page reload or navigating away and coming back, we should read from the firestore and get the selected mathches

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div>
      <div className='mx-3 flex flex-wrap items-center justify-center gap-4'>
        <div className='flex'>
          <div className='mx-4 flex flex-wrap items-center justify-center gap-4'>
            <div
              className='cursor-pointer rounded-lg px-10 py-4 text-center shadow-md '
              onClick={(e) => handleClick(e, '/predictandwin/add')}
            >
              <Text fontSize='xl' className='font-bold'>
                Add New Match
              </Text>
            </div>
            <div
              className='cursor-pointer rounded-lg px-10 py-4 text-center shadow-md '
              onClick={(e) => handleClick(e, '/predictandwin/view')}
            >
              <Text fontSize='xl' className='font-bold'>
                View Matches
              </Text>
            </div>
            <div
              className='cursor-pointer rounded-lg px-10 py-4 text-center shadow-md '
              onClick={(e) => handleClick(e, '/predictandwin/update')}
            >
              <Text fontSize='xl' className='font-bold'>
                Database Update
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPredictAndWinComponent;
