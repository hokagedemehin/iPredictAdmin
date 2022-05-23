import { Button, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';

const CampiagnsPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();

  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  return (
    <Layout name='campaigns' desc='I-Predict advert page'>
      <NavHeader />
      <div className=''>
        <div className='text my-5 text-center'>
          <Heading>Adverts & Campaigns </Heading>
        </div>
        <div className='flex flex-col items-center justify-center space-y-6 pt-16'>
          <Button
            colorScheme='teal'
            variant='solid'
            size='lg'
            onClick={() => router.push('/campaigns/add')}
          >
            Add New Campaign
          </Button>
          <Button
            colorScheme='blue'
            variant='solid'
            size='lg'
            onClick={() => router.push('/campaigns/view')}
          >
            View Campaign
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CampiagnsPage;
