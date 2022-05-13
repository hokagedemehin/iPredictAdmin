import { Button, IconButton, Image, Text } from '@chakra-ui/react';
// import Image from 'next/image';
import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { MdOutlineClear, MdClose } from 'react-icons/md';
import SaveSelectionToDatabase from '../../utils/predictandwinapi/saveSelectionToDatabase';
import moment from 'moment';

const SelectedMatches = ({ matchSelect, setSelectedMatches }) => {
  const [isLoadings, setIsLoadings] = useState(false);

  const removeSelection = (match) => {
    // console.log('match :>> ', match);
    const newMatches = matchSelect.filter((item) => item.id !== match.id);
    // console.log('matchSelect', matchSelect);
    setSelectedMatches(newMatches);
  };

  const clearSelection = () => {
    setSelectedMatches([]);
  };

  const confirmSelection = async () => {
    await SaveSelectionToDatabase(
      setIsLoadings,
      matchSelect,
      setSelectedMatches
    );
  };

  return (
    <div className='mx-2'>
      <Text fontSize='2xl' fontWeight='bold' py='2' textAlign='center'>
        Selected Matches
      </Text>

      {/* Selected Individual matches */}
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {matchSelect.map((matt, index) => (
          <div
            key={index}
            className='flex flex-col space-y-4 rounded-md border p-2 shadow-md sm:p-3'
          >
            <div className='flex justify-center text-base font-bold'>
              {moment(matt?.matchDate).format('MMMM Do YYYY, h:mm:ss a')}
            </div>
            <div
              // key={index}
              className='flex w-fit items-center justify-center space-x-3 '
              // style={{ width: "fit-content" }}
            >
              <div className='flex items-center justify-center space-x-1'>
                <Image
                  boxSize={['20px', '30px', '40px']}
                  src={matt.homeLogo}
                  alt={matt.homeTeam}
                  borderRadius='full'
                />
                <Text fontSize={['md', 'lg', 'xl']}>{matt?.homeTeam}</Text>
              </div>
              <Text fontSize={['xs', 'md', 'lg']} fontWeight='bold'>
                VS
              </Text>
              <div className='flex items-center justify-center space-x-1'>
                <Image
                  boxSize={['20px', '30px', '40px']}
                  src={matt.awayLogo}
                  alt={matt.awayTeam}
                  borderRadius='full'
                />
                <Text fontSize={['md', 'lg', 'xl']}>{matt?.awayTeam}</Text>
              </div>
              <div className='flex items-center justify-center'>
                <IconButton
                  variant='outline'
                  colorScheme='red'
                  aria-label='Remove Match'
                  fontSize='20px'
                  isRound
                  size='xs'
                  icon={<MdClose />}
                  onClick={() => removeSelection(matt)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm & Clear Buttons */}
      <div className='my-3 flex items-center justify-center space-x-2'>
        <Button
          rightIcon={<BiSend />}
          colorScheme='teal'
          variant='solid'
          // size='sm'
          onClick={() => confirmSelection()}
          isLoading={isLoadings}
          loadingText='Saving'
          spinnerPlacement='end'
        >
          Confirm
        </Button>
        <Button
          rightIcon={<MdOutlineClear />}
          colorScheme='red'
          variant='outline'
          // size='sm'
          onClick={() => clearSelection()}
        >
          Clear All
        </Button>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default SelectedMatches;
