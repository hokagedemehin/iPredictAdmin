import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';

import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';
import DatabaseFeedDetailsComponent from '../../components/news/databaseData/databasedetails.component';

const NewsAndTransfersDetailsPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  return (
    <Layout name='news details' desc='I-Predict news and transfers details'>
      <NavHeader />
      <div className=''>
        <DatabaseFeedDetailsComponent />
      </div>
    </Layout>
  );
};

export default NewsAndTransfersDetailsPage;
