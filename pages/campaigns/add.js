import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useUser } from '../../utils/context/userContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import AddCampaignPageComponent from '../../components/campaign/AddCampaign';

const AddCampaignPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  return (
    <Layout name='add-campaign' desc='I-predict Add Campaign'>
      <NavHeader />
      <div className='mx-2'>
        <div className='text my-5 text-center'>
          <div className='my-2 mx-auto flex max-w-xl'>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/campaigns')}
              className='mx-4 sm:mx-0'
            >
              Back
            </Button>
          </div>
          <Heading>Add Campaigns</Heading>
        </div>
        <AddCampaignPageComponent />
      </div>
    </Layout>
  );
};

export default AddCampaignPage;
