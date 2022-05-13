import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import PredictAndWinComponent from '../../components/predictandwin/predictandwin.component';
import { useUser } from '../../utils/context/userContext';
import BannerPredictAndWin from '../../components/predictandwin/banner.component';
import NewPredictAndWinComponent from '../../components/predictandwin/new.predictandwin.component';
const PredictAndWinPage = () => {
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
    <Layout name='matches' desc='I-Predict and Win'>
      <NavHeader />
      <div className=''>
        <div className='text my-5 text-center'>
          <Heading>Predict & Win</Heading>
        </div>
        <div className='mx-2'>
          <BannerPredictAndWin />
        </div>
        {/* <PredictAndWinComponent /> */}
        <NewPredictAndWinComponent />
      </div>
    </Layout>
  );
};

export default PredictAndWinPage;
