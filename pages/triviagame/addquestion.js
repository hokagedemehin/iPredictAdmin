import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import OneQuestion from '../../components/triviagames/questions.component';
import { useUser } from '../../utils/context/userContext';
import { BiArrowBack } from 'react-icons/bi';

const TrivisGamesPage = () => {
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
      <div className='mx-auto max-w-lg'>
        <div className='mx-4 flex w-full'>
          <Button
            leftIcon={<BiArrowBack />}
            variant='ghost'
            onClick={() => router.push('/triviagame')}
          >
            Back
          </Button>
        </div>
        <div className='text my-5 text-center'>
          <Heading>Add a question</Heading>
        </div>
        <OneQuestion />
      </div>
    </Layout>
  );
};

export default TrivisGamesPage;
