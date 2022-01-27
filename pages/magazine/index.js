import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import MagazineEmptyComponent from '../../components/emptypages/magazine.empty';

const MagazinePage = () => {
  return (
    <Layout name='magazine' desc='I-predict Magazine'>
      <NavHeader />
      <div className='max-w-sm mx-auto'>
        <div className='text text-center my-5'>
          <Heading>News Magazine</Heading>
        </div>
        <MagazineEmptyComponent />
      </div>
    </Layout>
  );
};

export default MagazinePage;
