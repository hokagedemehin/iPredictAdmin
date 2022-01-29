import { Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../../../components/layout/layout';
import NavHeader from '../../../../components/nav/header.component';
import EditOneQuestion from '../../../../components/triviagames/editonequestion';

// import ViewQuestionsContent from "../../../components/triviagames/viewquestions.component";

const ViewQuestionsPage = () => {
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
