import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import SpinMatchEmptyComponent from '../../components/emptypages/spinmatch.empty';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';

// ********************************************************
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
// *********************************************************
const SpinMatchVirtualPage = () => {
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
    <Layout name='spin' desc='I-Predict spin Match'>
      <NavHeader />
      <div className=''>
        <div className='text my-5 text-center'>
          <Heading>Spin Match Virtual</Heading>
        </div>
        <div className='flex w-full'>
          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'
            // loading
          >
            Download
          </Button>
        </div>
        <SpinMatchEmptyComponent />
      </div>
    </Layout>
  );
};

export default SpinMatchVirtualPage;
