import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../../../components/layout/layout';
import NavHeader from '../../../../components/nav/header.component';
import EditOneQuestion from '../../../../components/triviagames/editonequestion';
import { useUser } from '../../../../utils/context/userContext';

// import ViewQuestionsContent from "../../../components/triviagames/viewquestions.component";

const ViewQuestionsPage = () => {
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
    <Layout name='trivas' desc='I-Predict Trivas Game'>
      <NavHeader />
      <div className='max-w-lg mx-auto'>
        <div className='text text-center my-5'>
          <Heading>Edit Question</Heading>
        </div>
        <EditOneQuestion />
      </div>
    </Layout>
  );
};

export default ViewQuestionsPage;
