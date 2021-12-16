import { Button, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import MatchListComponent from "./matchlist.component";
import MatchesSelectedComponent from "./matchselected.component";
import { GiSoccerField } from "react-icons/gi";
import listofmatches from "../../utils/matches/listofmatches";
// import { FcAcceptDatabase } from "react-icons/fc";
import NoMatchListComponent from "./nomatchlist.component";
import NoMatchComponent from "./nomatch.component";

const PredictAndWinComponent = () => {
  const [formValue, setFormValue] = useState({});
  const [finalData, setFinalData] = useState(null);
  const [matchSelect, setMatchSelect] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  console.log("finalData: ", finalData);
  console.log("matchSelected: ", matchSelect);
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
    const res = await listofmatches(formValue, setisLoading);
    // console.log(res);
    setFinalData(res);
    // console.log(
    //   "🚀 ~ file: predictandwin.component.jsx ~ line 10 ~ PredictAndWinComponent ~ formValue",
    //   formValue
    // );
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 mx-3">
        <div className="flex w-1/2">
          <Select
            placeholder="Country"
            id="country"
            name="country"
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
        <div className="flex">
          <InputGroup>
            <InputLeftAddon children="Start Date" />
            <input
              type="date"
              name="startdate"
              id="startdate"
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
        </div>

        <div className="flex">
          {/* <input type="date" name="startdate" id="startdate" /> */}
          <InputGroup>
            <InputLeftAddon children="End Date" />
            <input
              type="date"
              name="enddate"
              id="enddate"
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
        </div>
        <div className="flex">
          <Button
            leftIcon={<GiSoccerField />}
            colorScheme="teal"
            variant="solid"
            isFullWidth
            fontSize="xl"
            onClick={handleMatches}
            isLoading={isLoading}
            loadingText="Loading"
            spinnerPlacement="end"
          >
            Get Matches
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-5 mx-3">
        {matchSelect.length !== 0 ? (
          <MatchesSelectedComponent
            matchSelect={matchSelect}
            setMatchSelect={setMatchSelect}
          />
        ) : (
          ""
        )}

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

        {/* <MatchListComponent key={index} finalData={finalData} /> */}
      </div>
    </div>
  );
};

export default PredictAndWinComponent;
