import { Button, Image, Text } from "@chakra-ui/react";
// import Image from "next/image";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import addMatchToFirestore from "../../utils/matches/addMatchToFirestore";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdateMatches from "../../utils/matches/updatematches";
import UpdateScoreToFirestore from "../../utils/matches/updateScoreToFirestore";
// import { useToast } from "@chakra-ui/react";

const MatchesSelectedComponent = ({ matchSelect, setMatchSelect }) => {
  console.log(
    "🚀 ~ file: matchselected.component.jsx ~ line 7 ~ MatchesSelectedComponent ~ matchSelect",
    matchSelect
  );
  // const [isLoading, setisLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // const toast = useToast();

  const addSelection = async () => {
    await addMatchToFirestore(matchSelect, setIsConfirmed);
  };
  const clearSelection = () => {
    setMatchSelect([]);
  };
  const updateSelection = async () => {
    matchSelect.forEach(async (matt) => {
      setIsUpdating(true);
      try {
        const data = await UpdateMatches(matt.fixtureId);
        // console.log("update data: ", data);
        // console.log("home goals: ", data?.response[0]?.goals?.home);
        // console.log("home away: ", data?.response[0]?.goals?.away);

        matt.homeGoal = data?.response[0]?.goals?.home;
        matt.awayGoal = data?.response[0]?.goals?.away;

        await UpdateScoreToFirestore(matt);
      } catch (error) {
        console.error(error);
        // toast({
        //   title: "An error occurred while updating",
        //   status: "error",
        //   position: "top-right",
        //   isClosable: true,
        // });
      } finally {
        // toast({
        //   title: "All Matches have been updated",
        //   status: "success",
        //   position: "top-right",
        //   isClosable: true,
        // });
        setIsUpdating(false);
      }

      // TODO do a query to select only the confirmed collection, then update the subcollection with the right scores
    });
    // console.log("update matchSelect: ", matchSelect);
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
          isLoading={isConfirmed}
          loadingText="Saving"
          spinnerPlacement="end"
        >
          Confirm
        </Button>
        <Button
          rightIcon={<GrUpdate />}
          colorScheme="blue"
          variant="outline"
          size="sm"
          onClick={updateSelection}
          isLoading={isUpdating}
          loadingText="Updating"
          spinnerPlacement="end"
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
