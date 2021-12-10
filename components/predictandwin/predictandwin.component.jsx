import { Button, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import MatchListComponent from "./matchlist.component";
import MatchesSelectedComponent from "./matchselected.component";
import { GiSoccerField } from "react-icons/gi";

const PredictAndWinComponent = () => {
  const [value, onChange] = useState(new Date());
  const handleMatches = async () => {
    await listofmatches();
  };
  return (
    <div>
      <div className="flex flex-col space-y-4 mx-2">
        <div className="flex w-1/2">
          <Select placeholder="Country">
            <option value="England">England</option>
            <option value="Spain">Spain</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
            <option value="Germany">Germany</option>
          </Select>
        </div>
        <div className="flex">
          <InputGroup>
            <InputLeftAddon children="Start Date" />
            <input type="date" name="startdate" id="startdate" />
          </InputGroup>
        </div>

        <div className="flex">
          {/* <input type="date" name="startdate" id="startdate" /> */}
          <InputGroup>
            <InputLeftAddon children="End Date" />
            <input type="date" name="enddate" id="enddate" />
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
          >
            Get Matches
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <MatchesSelectedComponent />
        <MatchListComponent />
      </div>
    </div>
  );
};

export default PredictAndWinComponent;
