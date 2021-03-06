import { Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { BiCheck, BiLoader } from 'react-icons/bi';
// import GetUsersPredictions from '../../utils/matches/getuserspredictions';
// import GetUsersInfo from '../../utils/matches/getusersinfo';
import moment from 'moment';
// import { useQuery } from 'react-query';
// import EachPrediction from "./eachprediction.component";

const AllUsersPredictions = ({ uniqueId, data: allPredictions }) => {
  // const [usersPredictions, setUsersPredictions] = useState([]);
  // const [userInfo, setUserInfo] = useState([]);
  // console.log('allPredictions', allPredictions);
  // console.log('usersPredictions', usersPredictions);
  // const dateConvert = new Date(Number(pred));
  // const predDate = moment(dateConvert).format('MMMM Do YYYY, h:mm:ss a');

  // const {
  //   isLoading: predLoading,
  //   data: predData,
  //   isSuccess: predSuccess,
  //   dataUpdatedAt: predsDate,
  // } = useQuery(
  //   ['getuserspredictions', Id, pred, email],
  //   async () => await GetUsersPredictions(Id, pred, email),
  //   { enabled: !![Id, pred, email] }
  // );
  // useEffect(() => {
  //   if (
  //     predSuccess &&
  //     typeof (predData !== null) &&
  //     Object?.keys(predData).length !== 0
  //   ) {
  //     const newArr = [];

  //     predData?.forEach((doc) => newArr.push(doc.data()));
  //     // if (newArr.length !== 0) {
  //     setUsersPredictions(newArr);
  //     // }
  //   }
  // }, [predSuccess, predsDate]);

  // const {
  //   isLoading: userLoading,
  //   data: userData,
  //   isSuccess: userSuccess,
  //   dataUpdatedAt: userDate,
  // } = useQuery(
  //   ['getuserspredictions', email],
  //   async () => await GetUsersInfo(email),
  //   { enabled: !![email] }
  // );
  // useEffect(() => {
  //   if (
  //     userSuccess &&
  //     typeof (userData !== null) &&
  //     Object?.keys(userData).length !== 0
  //   ) {
  //     const newArr = [];

  //     userData?.forEach((doc) => newArr.push(doc.data()));
  //     // if (newArr.length !== 0) {
  //     setUserInfo(newArr);
  //     // }
  //   }
  // }, [userSuccess, userDate]);

  const setOfPredictions = allPredictions.filter(
    (value) => value?.attributes?.uniqueId == uniqueId
  );

  return (
    <div className=''>
      <div className='w-fit rounded-md p-4 shadow-md ring-1 ring-gray-300 '>
        {/* {userLoading ? (
          <Skeleton>User details are loading</Skeleton>
        ) : (
          <div className='flex font-bold'>
            {setOfPredictions[0].attributes?.firstName}{' '}
            {setOfPredictions[0].attributes?.lastName}
          </div>
        )} */}
        {/* {userLoading ? (
          <Skeleton className='mt-1'>User details are loading</Skeleton>
        ) : (
          <div className='flex-flex-col'>
            <p className='text-xs text-gray-400'>
              {setOfPredictions[0].attributes?.email}
            </p>
            <p className='text-xs text-gray-400'>
              {moment(setOfPredictions[0].attributes?.createdAt).format(
                'MMMM Do YYYY, h:mm:ss a'
              )}
            </p>
          </div>
        )} */}

        {/* {predLoading && (
          <Skeleton className='h-24'>Matches are loading</Skeleton>
        )} */}

        {/* {predSuccess &&
          userSuccess &&
          usersPredictions.map((match, index) => (
            <div
              key={index}
              className='flex w-fit items-center justify-center space-x-3 p-1'
            >
              <div className='flex items-center justify-center space-x-1'>
                <Image
                  boxSize='20px'
                  src={match.homeLogo}
                  alt={match.homeName}
                  borderRadius='full'
                />
                <Text>{match?.homeGoal}</Text>
              </div>
              <Text fontSize='xs' fontWeight='bold'>
                VS
              </Text>
              <div className='flex items-center justify-center space-x-1'>
                <Image
                  boxSize='20px'
                  src={match.awayLogo}
                  alt={match.awayName}
                  borderRadius='full'
                />
                <Text>{match?.awayGoal}</Text>
              </div>
              <div className='flex space-x-2'>
                {match?.status == 'FT' ? (
                  match?.actualAwayGoal == match?.awayGoal &&
                  match?.actualHomeGoal == match?.homeGoal ? (
                    <Icon as={BiCheck} color='green' />
                  ) : (
                    <Icon as={MdClose} color='red' />
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
          ))} */}
        <div className='flex font-bold'>
          {setOfPredictions[0].attributes?.firstName}{' '}
          {setOfPredictions[0].attributes?.lastName}
        </div>
        <div className='flex-flex-col'>
          <p className='text-xs text-gray-400'>
            {setOfPredictions[0].attributes?.email}
          </p>
          <p className='text-xs text-gray-400'>
            {moment(setOfPredictions[0].attributes?.createdAt).format(
              'MMMM Do YYYY, h:mm:ss a'
            )}
          </p>
        </div>
        {setOfPredictions.map((match, index) => (
          <div
            key={index}
            className='flex w-fit items-center justify-center space-x-3 p-1'
          >
            <div className='flex items-center justify-center space-x-1'>
              <Image
                boxSize='20px'
                src={match?.attributes.homeLogo}
                alt={match?.attributes.homeName}
                borderRadius='full'
              />
              <Text fontSize={['xs', 'md', 'lg']}>
                {match?.attributes?.homeGoal}
              </Text>
            </div>
            <Text fontSize='xs' fontWeight='bold'>
              VS
            </Text>
            <div className='flex items-center justify-center space-x-1'>
              <Image
                boxSize='20px'
                src={match?.attributes.awayLogo}
                alt={match?.attributes.awayName}
                borderRadius='full'
              />
              <Text>{match?.attributes?.awayGoal}</Text>
            </div>
            <div className='flex items-center justify-center'>
              {/* icon logic to display */}
              <Text fontSize={['xs', 'md', 'lg']}>
                {match?.attributes?.userpredict}
              </Text>
              {match?.attributes?.result !== 'not played' ? (
                match?.attributes?.userpredict == match?.attributes?.result ? (
                  <Icon
                    as={BiCheck}
                    color='green'
                    boxSize={[4, 6, 8]}
                    className=' ml-2'
                  />
                ) : (
                  <Icon
                    as={MdClose}
                    color='red'
                    boxSize={[4, 6, 8]}
                    className=' ml-2'
                  />
                )
              ) : (
                <Icon
                  as={BiLoader}
                  color='blue'
                  boxSize={[4, 6, 8]}
                  className=' ml-2'
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersPredictions;

/**
 *   // console.log(predDate);
  // moment(dateConvert).format("January 24th 2022 at 14:25pm")
  // const getPreds = async () => {
  //   // await GetUsersPredictions(Id, pred, email, setUsersPredictions);
  //   // await GetUsersInfo(email, setUserInfo);
  // };

  // new Array

  // useQueries Hooks
  // const results = useQueries([
  //   {
  //     queryKey: ['getuserspredictions', Id, pred, email],
  //     queryFn: async () => await GetUsersPredictions(Id, pred, email),
  //   },
  //   {
  //     queryKey: ['getusersinfo', email],
  //     queryFn: async () => await GetUsersInfo(email),
  //   },
  // ]);

  // useEffect if successfull
  // console.log('results: ', results);

  // useEffect(() => {
  //   // const suc1 = results[0].isSuccess
  //   // const suc2 = results[1].isSuccess
  //   if (results[0].isSuccess && results[1].isSuccess) {
  //     const newArr = [];
  //     const newArr1 = [];
  //     results[0]?.data.forEach((doc) => newArr.push(doc.data()));
  //     results[1]?.data.forEach((doc) => newArr1.push(doc.data()));
  //     setUsersPredictions(newArr);
  //     setUserInfo(newArr1);
  //   }
  // }, []);
 */
