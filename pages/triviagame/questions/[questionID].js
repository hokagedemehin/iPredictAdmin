import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import OneQuestionComponent from '../../../components/triviagames/onequestion.component';
import { useUser } from '../../../utils/context/userContext';

const ViewQuestionsPage = ({ data }) => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(data);
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
      <div className='mx-auto max-w-xl'>
        <div className='text my-5 text-center'>
          <Heading>Question</Heading>
        </div>
        <div>
          <OneQuestionComponent data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default ViewQuestionsPage;

export async function getServerSideProps({ params }) {
  // console.log(params);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias/${params.questionID}`
  );
  // console.log(data);
  return {
    props: {
      // quizType: quizType?.data,
      data: data?.data,
    },
  };
}
