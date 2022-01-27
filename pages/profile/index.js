import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import NoUserEmptyComponent from '../../components/emptypages/nouser.empty';

const ProfilePage = () => {
  return (
    <Layout name='profile' desc='I-Predict User Profile'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          <Heading>My Profile</Heading>
        </div>

        <NoUserEmptyComponent />
      </div>
    </Layout>
  );
};

export default ProfilePage;
