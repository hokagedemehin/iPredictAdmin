import { Button, Heading, Skeleton, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import ViewQuestionsContent from '../../../components/triviagames/viewquestions.component';
import { useUser } from '../../../utils/context/userContext';
import { BiArrowBack } from 'react-icons/bi';
import { useQuery } from 'react-query';

const ViewQuestionsPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log('data: ', data);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  const { data, isSuccess, isLoading } = useQuery(
    'questions',
    async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias`)
  );

  // console.log('data :>> ', data);

  return (
    <Layout name='trivas' desc='I-Predict Trivas Game'>
      <NavHeader />
      <div className='mx-auto max-w-xl'>
        <div className='text my-5 text-center'>
          <div className='mx-4 flex w-full'>
            <Button
              leftIcon={<BiArrowBack />}
              variant='ghost'
              onClick={() => router.push('/triviagame')}
            >
              Back
            </Button>
          </div>
          <Heading>View Questions</Heading>
          {isSuccess && data && (
            <ViewQuestionsContent data={data?.data?.data} />
          )}
          <div className='space-y-3'>
            {isLoading &&
              [1, 2, 3, 4, 5].map((ques, index) => (
                <Skeleton key={index}>
                  <div className='flex cursor-pointer rounded-lg p-3 shadow-md '>
                    <Text isTruncated fontSize='lg'>
                      {ques}
                    </Text>
                  </div>
                </Skeleton>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewQuestionsPage;

// export async function getStaticProps() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trivias`
//   );
//   // Added
//   // console.log(data);
//   return {
//     props: {
//       // quizType: quizType?.data,
//       data: data?.data,
//     },
//     revalidate: 5,
//   };
// }
