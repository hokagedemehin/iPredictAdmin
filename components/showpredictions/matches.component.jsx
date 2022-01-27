import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GetAllMatches from '../../utils/matches/getallmatches';
import EachMatchSelected from './eachmatch.component';
import EachMatchSkeletonSelected from './eachmatchskeleton.component';
// import EachMatchSkeletonSelected from "./eachmatchskeleton.component";

const AllMatchesSelected = () => {
  const [matches, setMatches] = useState([]);

  const { isLoading, data, isSuccess } = useQuery(
    'allselectedMatches',
    async () => await GetAllMatches()
  );
  // console.log(matches);
  useEffect(() => {
    if (isSuccess) {
      const newArr = [];
      data.forEach((doc) => newArr.push(doc.data()));
      setMatches(newArr);
      // data.forEach((doc) => setMatches([...matches, doc.data()]));
    }
  }, [isSuccess]);
  // console.log("matches: ", matches);
  return (
    <div className='flex flex-wrap gap-2 justify-center items-center mx-2'>
      {isLoading &&
        [0, 1, 2, 3].map((match, index) => (
          <EachMatchSkeletonSelected key={index} match={match} />
        ))}
      {isSuccess &&
        matches.map((match, index) => (
          <EachMatchSelected key={index} match={match} />
        ))}
    </div>
  );
};

export default AllMatchesSelected;
