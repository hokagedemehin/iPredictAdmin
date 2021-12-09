import { InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import MatchListComponent from "./matchlist.component";
import MatchesSelectedComponent from "./matchselected.component";

const PredictAndWinComponent = () => {
  const [value, onChange] = useState(new Date());
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
      </div>
      <div className="flex flex-col mt-5">
        <MatchesSelectedComponent />
        <MatchListComponent />
      </div>
    </div>
  );
};

export default PredictAndWinComponent;
