import { Heading, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import MyPredictionsEmptyComponent from '../../components/emptypages/mypredictions.empty';
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
  // console.log('data: ', data);
  // console.log("isSuccess: ", isSuccess);

  // const data1 = data?.predictInfo || {};
  const data1 = data?.predictInfo1 || {};
  // console.log('data1', data.predictInfo1);
  // console.log(isSuccess, Object?.keys(data1).length === 0);
  // console.log("prediction doc: ", predictions);
  return (
    <Layout name='predictions' desc='See all Users Predictions'>
      <NavHeader />
      <div className=''>
        <div className='text my-5 text-center'>
          <Heading>All Predictions</Heading>
        </div>

        {isLoading && (
          <div className='mx-4 flex flex-col items-center justify-center space-y-3'>
            {[0, 1, 2].map((val, index) => (
              <Skeleton className='h-40 w-1/2' key={index}>
                {val}
              </Skeleton>
            ))}
          </div>
        )}

        <div className='mx-2 flex flex-wrap items-center justify-center gap-4'>
          {data1 &&
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
            })}

          {isSuccess && Object?.keys(data1).length === 0 && (
            <MyPredictionsEmptyComponent />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllUsersPredictionComponent;

/**
 * {data1 &&
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
 */
