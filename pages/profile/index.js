// import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import NoUserEmptyComponent from '../../components/emptypages/nouser.empty';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';
import ProfilePageComponent from '../../components/profile/users.component';
const ProfilePage = () => {
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
    <Layout name='profile' desc='I-Predict User Profile'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text text-center my-5'>
          {/* <Heading>My Profile</Heading> */}
        </div>
        <ProfilePageComponent userDoc={userDoc} />
        {/* <NoUserEmptyComponent /> */}
      </div>
    </Layout>
  );
};

export default ProfilePage;
