import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import TriviaAttemptsPageComponent from '../../components/triviagames/attempts/triviaattempts.component';
import { useUser } from '../../utils/context/userContext';
import axios from 'axios';
// import moment from 'moment';
// const qs = require('qs');

const TriviaAttemptsPage = ({ data }) => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(data);
  // console.log(data[0]?.attributes?.createdAt);
  // console.log(moment(data[0]?.attributes?.createdAt).format('MMM Do YY'));
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  return (
    <Layout name='trivia-attempts' desc='I-Predict Trivia Attempts'>
      <NavHeader />
      <div className='mx-2 sm:mx-4'>
        <div className='text my-5 text-center'>
          <Heading>Trivia Attempts</Heading>
        </div>
        <TriviaAttemptsPageComponent triviaData={data} />
      </div>
    </Layout>
  );
};

export default TriviaAttemptsPage;

export async function getServerSideProps() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivia-attempts?populate=*`
  );
  // console.log(data);
  return {
    props: {
      // quizType: quizType?.data,
      data: data?.data,
    },
  };
}
