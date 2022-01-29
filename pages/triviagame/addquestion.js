import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import OneQuestion from '../../components/triviagames/questions.component';

const TrivisGamesPage = () => {
  return (
    <Layout name='trivas' desc='I-Predict Trivas Game'>
      <NavHeader />
      <div className='max-w-lg mx-auto'>
        <div className='text text-center my-5'>
          <Heading>Add a question</Heading>
        </div>
        <OneQuestion />
      </div>
    </Layout>
  );
};

export default TrivisGamesPage;
