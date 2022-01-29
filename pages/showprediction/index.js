import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import AllMatchesSelected from '../../components/showpredictions/matches.component';

const ShowPredictionComponent = () => {
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
