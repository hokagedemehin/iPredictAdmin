import React, { useEffect } from 'react';
import LoginComponent from '../../components/login/login.components';
import Layout from '../../components/layout/layout';

import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';

const LoginPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/');
  }, []);
  // console.log(user);
  useEffect(() => {
    if (userDoc && userDoc.role === 'admin') {
      router.back();
      // router.push("/");
    }
  }, [userDoc]);

  return (
    <Layout name='Login' desc='Admin Users can Login with thier credentials'>
      <LoginComponent />
    </Layout>
  );
};

export default LoginPage;
