import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import NewGetMyPrediction from '../../utils/matches/newgetallmatches';
import MyPredictionsEmptyComponent from '../emptypages/mypredictions.empty';
import EachMatchSelected from './eachmatch.component';
import EachMatchSkeletonSelected from './eachmatchskeleton.component';
// import EachMatchSkeletonSelected from "./eachmatchskeleton.component";

const AllMatchesSelected = () => {
  const [matches, setMatches] = useState([]);

  // const [myPredictions, setMyPredictions] = useState([])

  const { isLoading, data, isSuccess } = useQuery(
    'allselectedMatches',
    async () => await NewGetMyPrediction()
  );
  // console.log(matches);
  // console.log('data :>> ', data);
  useEffect(() => {
    if (isSuccess) {
      const newArr = [];
      data.forEach((doc) => {
        let newData = {
          id: doc.id,
          ...doc.attributes,
        };
        newArr.push(newData);
      });
      setMatches(newArr);
    }
  }, [isSuccess]);
  // console.log("matches: ", matches);
  return (
    <div className='mx-2 flex flex-wrap items-center justify-center gap-2'>
      {isLoading &&
        [0, 1, 2, 3].map((match, index) => (
          <EachMatchSkeletonSelected key={index} match={match} />
        ))}
      {isSuccess &&
        matches.map((match, index) => (
          <EachMatchSelected key={index} match={match} />
        ))}
      {matches.length === 0 && isSuccess && <MyPredictionsEmptyComponent />}
    </div>
  );
};

export default AllMatchesSelected;
