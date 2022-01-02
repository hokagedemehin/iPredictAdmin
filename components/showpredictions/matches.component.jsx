import React, { useEffect, useState } from "react";
import GetAllMatches from "../../utils/matches/getallmatches";
import EachMatchSelected from "./eachmatch.component";

const AllMatchesSelected = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    GetAllMatches(setMatches);
  }, []);
  // console.log("matches: ", matches);
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center mx-2">
      {matches &&
        matches.map((match, index) => (
          <EachMatchSelected key={index} match={match} />
        ))}
    </div>
  );
};

export default AllMatchesSelected;
