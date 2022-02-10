import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
// import { useRouter } from 'next/router';
// import { motion } from 'framer-motion';

const NewsFeedComponent = ({ elem }) => {
  const timeofNews = moment(elem?.published_at).startOf('hour').fromNow();
  // console.log(timeofNews);

  // const MotionDiv = motion(Box);

  return (
    <div
      // whileHover={{ scale: 1.04 }}
      // whileTap={{ scale: 0.9 }}
      // transition={{ duration: 0.4 }}
      className='w-full space-y-1 rounded-md p-3 shadow-md ring-1 ring-gray-200'
      // onClick={(e) => handleClick(e, elem?.id)}
    >
      <Heading size={['xs', 'md']} className=''>
        {elem?.title}
      </Heading>
      <Text className='flex justify-end '>{timeofNews}</Text>
    </div>
  );
};

export default NewsFeedComponent;
