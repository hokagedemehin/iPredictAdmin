import { Heading, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import MagazineEmptyComponent from '../../components/emptypages/magazine.empty';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';
// import { motion } from 'framer-motion';

// const MotionBox = motion(Button);

const MagazinePage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  return (
    <Layout name='magazine' desc='I-predict Magazine'>
      <NavHeader />
      <div className=''>
        <div className='text my-5 text-center'>
          <Heading>News Magazine</Heading>
        </div>
        {/* <MagazineEmptyComponent /> */}
        <div className='flex flex-col items-center justify-center space-y-6 pt-16'>
          <Button
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            colorScheme='teal'
            variant='solid'
            size='lg'
            onClick={() => router.push('/magazine/add')}
          >
            Add New Magazine
          </Button>
          <Button
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            colorScheme='blue'
            variant='solid'
            size='lg'
            onClick={() => router.push('/magazine/view')}
          >
            View Magazine
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MagazinePage;
