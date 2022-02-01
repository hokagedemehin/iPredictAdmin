import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import OneQuestionComponent from '../../../components/triviagames/onequestion.component';
import { useUser } from '../../../utils/context/userContext';

const ViewQuestionsPage = () => {
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
    <Layout name='trivas' desc='I-Predict Trivas Game'>
      <NavHeader />
      <div className='max-w-xl mx-auto'>
        <div className='text text-center my-5'>
          <Heading>Question</Heading>
        </div>
        <div>
          <OneQuestionComponent />
        </div>
      </div>
    </Layout>
  );
};

export default ViewQuestionsPage;
