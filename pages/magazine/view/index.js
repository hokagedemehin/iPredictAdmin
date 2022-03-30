import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MagazineEmptyComponent from '../../../components/emptypages/magazine.empty';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { useUser } from '../../../utils/context/userContext';

const ViewMagazinePage = () => {
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
        <div className='text my-5 text-center'>
          <Heading>View News Magazine</Heading>
        </div>
        <MagazineEmptyComponent />
      </div>
    </Layout>
  );
};

export default ViewMagazinePage;
