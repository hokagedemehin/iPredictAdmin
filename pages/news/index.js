import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import NewsTransferEmptyComponent from '../../components/emptypages/newsandtransfer.empty';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';
import NewsHomeComponents from '../../components/news/newsHomeComponents';
// import GetApiCount from '../../utils/context/getApiCount';
// import { useQuery } from 'react-query';

const NewsAndTransfersPage = () => {
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

  // const docName = 'news';

  // const { data, isSuccess } = useQuery(
  //   ['getAPI', docName],
  //   async () => await GetApiCount(docName),
  //   { enabled: !!docName }
  // );

  // console.log('data', data);

  return (
    <Layout name='news' desc='I-Predict news and transfers'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>News & Transfers </Heading>
        </div>
        {/* <NewsTransferEmptyComponent /> */}
        <NewsHomeComponents />
      </div>
    </Layout>
  );
};

export default NewsAndTransfersPage;
