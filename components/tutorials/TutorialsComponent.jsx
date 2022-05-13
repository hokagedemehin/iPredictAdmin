import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import DatabaseVideos from './DatabaseVideos';
import YouTubeVideos from './YouTubeVIdeos';

const TutorialsComponent = () => {
  return (
    <div>
      <Tabs isFitted variant='unstyled' colorScheme='teal'>
        <TabList mb='1rem'>
          <Tab
            _selected={{ color: 'white', bg: 'purple.700' }}
            className='rounded-full font-bold text-black'
          >
            YouTube Videos
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'purple.700' }}
            className='rounded-full font-bold text-black'
          >
            Database Videos
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className='flex items-center justify-center gap-4'>
              <YouTubeVideos />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='flex items-center justify-center gap-4'>
              <DatabaseVideos />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TutorialsComponent;
