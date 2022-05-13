import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import TutorialsComponent from '../../components/tutorials/TutorialsComponent';
import { useUser } from '../../utils/context/userContext';

const UserWalletPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  return (
    <Layout name='wallet' desc='I-Predict User Wallet'>
      <NavHeader />
      <div className='mx-2'>
        <div className='text my-5 text-center'>
          <Heading>Tutorials</Heading>
        </div>
        <div className=''>
          <TutorialsComponent />
        </div>
      </div>
    </Layout>
  );
};

export default UserWalletPage;
