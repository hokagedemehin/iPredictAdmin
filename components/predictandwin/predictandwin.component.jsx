import { Button, InputGroup, InputLeftAddon, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchListComponent from './matchlist.component';
import MatchesSelectedComponent from './matchselected.component';
import { GiSoccerField } from 'react-icons/gi';
import listofmatches from '../../utils/matches/listofmatches';
// import { FcAcceptDatabase } from "react-icons/fc";
import NoMatchListComponent from './nomatchlist.component';
import NoMatchComponent from './nomatch.component';
import selectedMacthesForPrediction from '../../utils/matches/selectedMacthesForPrediction';
import { useQuery } from 'react-query';
import MatchesSelectedSkeletonComponent from './matchselectedloading.component';
const PredictAndWinComponent = () => {
  const [formValue, setFormValue] = useState({});
  const [finalData, setFinalData] = useState(null);
  const [matchSelect, setMatchSelect] = useState([]);
  const [isLoadings, setisLoadings] = useState(false);

  // * This is the point where I will check if match select is empty, if it is empty
  //  * Once it is empty, upon page reload or navigating away and coming back, we should read from the firestore and get the selected mathches
  let newArr = [];

  const { isLoading, data, isSuccess } = useQuery(
    'selectedMatches',
    async () => await selectedMacthesForPrediction()
  );
  useEffect(() => {
    if (
      isSuccess &&
      typeof (data !== null) &&
      Object?.keys(data).length !== 0
    ) {
      data.forEach((doc) => newArr.push(doc.data()));
      setMatchSelect(newArr);
    }
  }, [isSuccess]);
  // console.log("finalData: ", finalData);
  // console.log('matchSelected: ', matchSelect);
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  // const res = null;
  // if (!res) {
  //   console.log("no data");
  // } else {
  //   console.log("there is data", res);
  // }

  const handleMatches = async () => {
    const res = await listofmatches(formValue, setisLoadings);
    // console.log(res);
    setFinalData(res);
    // console.log(
    //   "🚀 ~ file: predictandwin.component.jsx ~ line 10 ~ PredictAndWinComponent ~ formValue",
    //   formValue
    // );
  };

  return (
    <div>
      <div className='mx-3 flex flex-wrap items-center justify-center gap-4'>
        <div className='flex'>
          <Select
            placeholder='Country'
            id='country'
            name='country'
            onChange={(e) => handleChange(e)}
            // className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 sm:text-sm"
          >
            {/* <option value="">Country</option> */}
            <option value={39}>England</option>
            <option value={140}>Spain</option>
            <option value={61}>France</option>
            <option value={135}>Italy</option>
            <option value={78}>Germany</option>
          </Select>
        </div>
        <div className='flex'>
          <InputGroup>
            <InputLeftAddon children='Start Date' />
            <input
              type='date'
              name='startdate'
              id='startdate'
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
        </div>

        <div className='flex'>
          {/* <input type="date" name="startdate" id="startdate" /> */}
          <InputGroup>
            <InputLeftAddon children='End Date' />
            <input
              type='date'
              name='enddate'
              id='enddate'
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
        </div>
        <div className='flex w-full'>
          <Button
            leftIcon={<GiSoccerField />}
            colorScheme='teal'
            variant='solid'
            isFullWidth
            fontSize='xl'
            onClick={handleMatches}
            isLoading={isLoadings}
            loadingText='Loading'
            spinnerPlacement='end'
          >
            Get Matches
          </Button>
        </div>
      </div>
      <div className='mx-3 mt-5 flex flex-col'>
        <div className='flex items-center justify-center'>
          {isLoading && <MatchesSelectedSkeletonComponent />}
          {isSuccess && matchSelect.length !== 0 && (
            <MatchesSelectedComponent
              matchSelect={matchSelect}
              setMatchSelect={setMatchSelect}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          )}
          {isSuccess && matchSelect.length === 0 && ''}
        </div>

        <div className='mt-5 flex flex-wrap items-center justify-center gap-3'>
          {!finalData ? (
            <NoMatchListComponent />
          ) : finalData?.results === 0 ? (
            <NoMatchComponent />
          ) : (
            finalData?.response?.map((matches, index) => (
              <MatchListComponent
                key={index}
                matches={matches}
                setMatchSelect={setMatchSelect}
                matchSelect={matchSelect}
              />
            ))
          )}
        </div>

        {/* <MatchListComponent key={index} finalData={finalData} /> */}
      </div>
    </div>
  );
};

export default PredictAndWinComponent;
