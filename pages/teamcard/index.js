import { Button, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
// import TeamCardEmptyComponent from "../../components/emptypages/teamcard.empty";
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';

const TeamCardsPage = () => {
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
    <Layout name='team card' desc='I-Predict Team Card'>
      <NavHeader />
      <div className=''>
        <div className='text my-5 text-center'>
          <Heading>Team Cards</Heading>
        </div>
        {/* <TeamCardEmptyComponent /> */}
        <div className='flex flex-col items-center justify-center space-y-6 pt-16'>
          <Button
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            colorScheme='whatsapp'
            variant='solid'
            size='lg'
            onClick={() => router.push('/teamcard/add')}
          >
            Add New Card
          </Button>
          <Button
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
            colorScheme='twitter'
            variant='solid'
            size='lg'
            onClick={() => router.push('/teamcard/view')}
          >
            View Card
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TeamCardsPage;
