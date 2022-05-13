import { Text } from '@chakra-ui/react';
import React from 'react';

const YouTubeVideos = () => {
  return (
    <div>
      <div className=''>
        <div className='flex items-center justify-center border p-4'>
          <Text>Name of Video</Text>
          <Text>Description of Video</Text>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex minus
            laborum esse expedita pariatur voluptatem. Repellendus eum, quasi
            nostrum veritatis ut magnam laborum provident, animi sequi mollitia,
            ea culpa harum.
          </Text>
          <div className='relative flex w-fit items-center justify-center overflow-hidden'>
            <div className='flex items-center justify-center'>
              <iframe
                className='h-[20rem] w-[20rem]'
                src='https://www.youtube.com/embed/8YWrmZoUYGs'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideos;
