import { Button, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import { useQuery } from 'react-query';
import MyPredictionsEmptyComponent from '../../components/emptypages/mypredictions.empty';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import AllUsersPredictions from '../../components/showpredictions/allpredictions.component';
import { useUser } from '../../utils/context/userContext';
// import GetAllPredictions from '../../utils/matches/getallpredictions';
import { BiArrowBack } from 'react-icons/bi';
const AllUsersPredictionComponent = ({ data: allPredictions }) => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log('allPredictions :>> ', allPredictions);
  // console.log(user);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  // const router = useRouter();
  // const Id = router.query.matchId;

  // const { isLoading, data, isSuccess } = useQuery(
  //   ['predicts', Id],
  //   async () => await GetAllPredictions(Id),
  //   { enabled: !!Id }
  // );

  // const data1 = data?.predictInfo1 || {};

  let set = new Set();
  allPredictions?.forEach((elem) => {
    set.add(elem?.attributes?.uniqueId);
  });

  let finalSet = [...set];

  return (
    <Layout name='predictions' desc='See all Users Predictions'>
      <NavHeader />
      <div className=''>
        <div className='mx-4 flex w-full'>
          <Button
            leftIcon={<BiArrowBack />}
            variant='ghost'
            onClick={() => router.push('/showprediction')}
          >
            Back
          </Button>
        </div>
        <div className='flex w-full items-center justify-center '>
          <div className='my-5 w-full text-center'>
            <Heading>All Predictions</Heading>
          </div>
        </div>

        {/* {isLoading && (
          <div className='mx-4 flex flex-col items-center justify-center space-y-3'>
            {[0, 1, 2].map((val, index) => (
              <Skeleton className='h-40 w-1/2' key={index}>
                {val}
              </Skeleton>
            ))}
          </div>
        )} */}

        <div className='mx-2 flex flex-wrap items-center justify-center gap-4'>
          {/* {data1 &&
            isSuccess &&
            Object.entries(data1).map(([key, value]) => {
              // value.sort(function (a, b) {
              //   return b - a;
              // });
              // *Id - current mtches ID
              return (
                <AllUsersPredictions
                  key={key}
                  pred={key}
                  email={value}
                  Id={Id}
                />
              );
            })} */}

          {finalSet.length > 0 &&
            finalSet.map((elem) => (
              <AllUsersPredictions
                key={elem}
                uniqueId={elem}
                data={allPredictions}
                // Id={Id}
              />
            ))}

          {/* {isSuccess && Object?.keys(data1).length === 0 && (
            <MyPredictionsEmptyComponent />
          )} */}
          {finalSet.length === 0 && <MyPredictionsEmptyComponent />}
        </div>
      </div>
    </Layout>
  );
};

export default AllUsersPredictionComponent;

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches/${params.matchId}?populate=*`
  );
  return {
    props: {
      data: data?.data?.attributes?.user_matches?.data,
    },
  };
}
