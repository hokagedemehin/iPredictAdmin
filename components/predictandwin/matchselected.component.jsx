import { Button, Image, Text } from "@chakra-ui/react";
// import Image from "next/image";
import React from "react";
import { BiSend } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import addMatchToFirestore from "../../utils/matches/addMatchToFIrestore";
import { ToastContainer } from "react-toastify";
import UpdateMatches from "../../utils/matches/updatematches";

const MatchesSelectedComponent = ({ matchSelect, setMatchSelect }) => {
  console.log(
    "🚀 ~ file: matchselected.component.jsx ~ line 7 ~ MatchesSelectedComponent ~ matchSelect",
    matchSelect
  );
  const addSelection = async () => {
    await addMatchToFirestore(matchSelect);
  };
  const clearSelection = () => {
    setMatchSelect([]);
  };
  const updateSelection = () => {
    matchSelect.forEach((matt) => {
      const data = UpdateMatches(matt.fixtureId);
      matt.homeGoal = data?.response?.golas?.home;
      matt.awayGoal = data?.response?.golas?.away;

      // TODO do a query to select only the confirmed collection, then update the subcollection with the right scores
    });
  };
  // console.log(object)
  return (
    <div className="mx-2">
      <Text fontSize="md" fontWeight="black" py="2" textAlign="center">
        Selected Matches
      </Text>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {matchSelect.map((matt, index) => (
          <div
            key={index}
            className="flex space-x-3 ring-1 w-fit p-1 rounded-md justify-center items-center"
            // style={{ width: "fit-content" }}
          >
            <div className="flex justify-center items-center space-x-1">
              <Image
                boxSize="20px"
                src={matt.homeLogo}
                alt={matt.homeName}
                borderRadius="full"
              />
              <Text>{!matt?.homeGoal ? 0 : matt?.homeGoal}</Text>
            </div>
            <Text fontSize="xs" fontWeight="bold">
              VS
            </Text>
            <div className="flex justify-center items-center space-x-1">
              <Image
                boxSize="20px"
                src={matt.awayLogo}
                alt={matt.awayName}
                borderRadius="full"
              />
              <Text>{!matt?.awayGoal ? 0 : matt?.awayGoal}</Text>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-3 space-x-5">
        <Button
          rightIcon={<BiSend />}
          colorScheme="teal"
          variant="solid"
          size="sm"
          onClick={addSelection}
        >
          Confirm
        </Button>
        <Button
          rightIcon={<GrUpdate />}
          colorScheme="blue"
          variant="outline"
          size="sm"
          onClick={updateSelection}
        >
          Update
        </Button>
        <Button
          rightIcon={<MdOutlineClear />}
          colorScheme="red"
          variant="outline"
          size="sm"
          onClick={clearSelection}
        >
          Clear All
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MatchesSelectedComponent;
