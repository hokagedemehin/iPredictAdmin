import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../../../components/layout/layout';
import NavHeader from '../../../../components/nav/header.component';
import EditOneQuestion from '../../../../components/triviagames/editonequestion';
import { useUser } from '../../../../utils/context/userContext';

// import ViewQuestionsContent from "../../../components/triviagames/viewquestions.component";

const ViewQuestionsPage = ({ data }) => {
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
      <div className='mx-auto max-w-lg pb-4'>
        <div className='text my-5 text-center'>
          <Heading>Edit Question</Heading>
        </div>
        <EditOneQuestion data={data} />
      </div>
    </Layout>
  );
};

export default ViewQuestionsPage;

export async function getServerSideProps({ params }) {
  // console.log(params);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias/${params.editID}`
  );
  // console.log(data);
  return {
    props: {
      // quizType: quizType?.data,
      data: data?.data,
    },
  };
}
