import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import NewsTransferEmptyComponent from '../../components/emptypages/newsandtransfer.empty';

const NewsAndTransfersPage = () => {
  return (
    <Layout name='news' desc='I-Predict news and transfers'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>News & Transfers</Heading>
        </div>
        <NewsTransferEmptyComponent />
      </div>
    </Layout>
  );
};

export default NewsAndTransfersPage;
