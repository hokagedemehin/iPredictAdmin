import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';

import { useRouter } from 'next/router';
import { useUser } from '../../../utils/context/userContext';
import DatabaseFeedDetailsComponent from '../../../components/news/databaseData/databasedetails.component';
import { useQuery } from 'react-query';
import GetNewsDetail from '../../../utils/news/getNewsDetail';

const NewsAndTransfersDetailsPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  const [details, setDetails] = useState([]);

  // check if the user is an admin
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  // get the details of the news clicked on
  const { section, newsID } = router.query;
  // console.log(id);
  // console.log('router', router.query);
  const { isLoading, data, isSuccess } = useQuery(
    ['news-details', section, newsID],
    async () => await GetNewsDetail(section, newsID),
    { enabled: !![section, newsID] }
  );
  // console.log('isSuccess :>> ', isSuccess);
  // console.log('data :>> ', data.data());
  // console.log('details', details);
  useEffect(() => {
    if (
      isSuccess
      // typeof (data !== null) &&
      // Object?.keys(data).length !== 0
    ) {
      // databaseData.forEach((doc) => newArr.push(doc.data()));

      setDetails(data.data());
    }
  }, [isSuccess, data]);

  return (
    <Layout name='news details' desc='I-Predict news and transfers details'>
      <NavHeader />
      <div className=''>
        <DatabaseFeedDetailsComponent isLoading={isLoading} details={details} />
      </div>
    </Layout>
  );
};

export default NewsAndTransfersDetailsPage;
