import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import MagazineEmptyComponent from '../../components/emptypages/magazine.empty';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';

const MagazinePage = () => {
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
    <Layout name='magazine' desc='I-predict Magazine'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>News Magazine</Heading>
        </div>
        <MagazineEmptyComponent />
      </div>
    </Layout>
  );
};

export default MagazinePage;
