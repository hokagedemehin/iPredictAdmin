import { Heading, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import AllUsersPredictions from '../../components/showpredictions/allpredictions.component';
import { useUser } from '../../utils/context/userContext';
import GetAllPredictions from '../../utils/matches/getallpredictions';

const AllUsersPredictionComponent = () => {
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

  // const router = useRouter();
  const Id = router.query.matchId;

  // const [predictions, setPredictions] = useState([]);

  // const getpredict = async () => {
  //   await GetAllPredictions(setPredictions, Id);
  // };
  // useEffect(() => {
  //   if (Id) {
  //     getpredict();
  //   }
  // }, [Id]);

  const { isLoading, data, isSuccess } = useQuery(
    ['predicts', Id],
    async () => await GetAllPredictions(Id),
    { enabled: !!Id }
  );

  // console.log("isLoading: ", isLoading);
  // console.log("isError: ", isError);
  // console.log("data: ", data);
  // console.log("isSuccess: ", isSuccess);

  const data1 = data?.predictInfo || {};
  // console.log('data1', data1);
  // console.log("prediction doc: ", predictions);
  return (
    <Layout name='predictions' desc='See all Users Predictions'>
      <NavHeader />
      <div className=''>
        <div className='text text-center my-5'>
          <Heading>All Predictions</Heading>
        </div>

        {isLoading && (
          <div className='flex flex-col space-y-3 mx-4 justify-center items-center'>
            {[0, 1, 2].map((val, index) => (
              <Skeleton className='w-1/2 h-40' key={index}>
                {val}
              </Skeleton>
            ))}
          </div>
        )}

        <div className='flex flex-wrap gap-4 mx-2 justify-center items-center'>
          {data1 &&
            isSuccess &&
            Object.entries(data1).map(([key, value]) => {
              value.sort(function (a, b) {
                return b - a;
              });
              return value.map((pred, index) => (
                <AllUsersPredictions
                  key={index}
                  pred={pred}
                  email={key}
                  Id={Id}
                />
              ));
            })}
        </div>
      </div>
    </Layout>
  );
};

export default AllUsersPredictionComponent;
