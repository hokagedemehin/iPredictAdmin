import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import TriviaAttemptsPageComponent from '../../components/triviagames/attempts/triviaattempts.component';

const TriviaAttemptsPage = () => {
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
