import { Button } from '@chakra-ui/react';
import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const DatabaseFeedDetailsComponent = () => {
  const router = useRouter();
  return (
    <div>
      <div className='flex'>
        <Button
          variant='link'
          leftIcon={<ArrowBackIcon />}
          onClick={() => router.push('/news')}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DatabaseFeedDetailsComponent;
