import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import TriviaAttemptsPageComponent from '../../components/triviagames/attempts/triviaattempts.component';
import { useUser } from '../../utils/context/userContext';

const TriviaAttemptsPage = () => {
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
    <Layout name='trivia-attempts' desc='I-Predict Trivia Attempts'>
      <NavHeader />
      <div className='mx-2 sm:mx-4'>
        <div className='text text-center my-5'>
          <Heading>Trivia Attempts</Heading>
        </div>
        <TriviaAttemptsPageComponent />
      </div>
    </Layout>
  );
};

export default TriviaAttemptsPage;
