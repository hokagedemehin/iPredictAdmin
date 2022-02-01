import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import AllMatchesSelected from '../../components/showpredictions/matches.component';
import { useUser } from '../../utils/context/userContext';

const ShowPredictionComponent = () => {
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
    <Layout name='predictions' desc='See all Users Predictions'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>Users Predictions</Heading>
        </div>
        <AllMatchesSelected />
      </div>
    </Layout>
  );
};

export default ShowPredictionComponent;
