import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import SpinMatchEmptyComponent from '../../components/emptypages/spinmatch.empty';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';

const SpinMatchVirtualPage = () => {
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
    <Layout name='spin' desc='I-Predict spin Match'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>Spin Match Virtual</Heading>
        </div>
        <SpinMatchEmptyComponent />
      </div>
    </Layout>
  );
};

export default SpinMatchVirtualPage;
