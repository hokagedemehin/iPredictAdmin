import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import SpinMatchEmptyComponent from '../../components/emptypages/spinmatch.empty';

const SpinMatchVirtualPage = () => {
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
