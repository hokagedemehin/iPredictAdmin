import { Icon, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import GetUsersPredictions from "../../utils/matches/getuserspredictions";
import GetUsersInfo from "../../utils/matches/getusersinfo";
import moment from "moment";
// import EachPrediction from "./eachprediction.component";

const AllUsersPredictions = ({ pred, email, Id }) => {
  // console.log("pred: ", pred);
  // console.log("email: ", email);
  const [usersPredictions, setUsersPredictions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const dateConvert = new Date(Number(pred));
  const predDate = moment(dateConvert).format("MMMM Do YYYY, h:mm:ss a");
  // console.log(predDate);
  const getPreds = async () => {
    await GetUsersPredictions(Id, pred, email, setUsersPredictions);
    await GetUsersInfo(email, setUserInfo);
  };
  // console.log("user info: ", userInfo);
  // console.log("user pred: ", usersPredictions);

  useEffect(() => {
    getPreds();
  }, []);

  return (
    <div className="">
      <div className="shadow-md ring-1 ring-gray-300 p-4 rounded-md w-fit ">
        <div className="flex font-bold">
          {userInfo.firstName} {userInfo.lastName}
        </div>
        <div className="flex-flex-col">
          <p className="text-xs text-gray-400">{email}</p>
          <p className="text-xs text-gray-400">{predDate}</p>
        </div>
        {/* <Text>{email}</Text>
        <Text >{predDate}</Text> */}
        {usersPredictions &&
          usersPredictions.map((match, index) => (
            <div
              key={index}
              className="flex space-x-3 w-fit p-1 justify-center items-center"
            >
              <div className="flex justify-center items-center space-x-1">
                <Image
                  boxSize="20px"
                  src={match.homeLogo}
                  alt={match.homeName}
                  borderRadius="full"
                />
                <Text>{match?.homeGoal}</Text>
              </div>
              <Text fontSize="xs" fontWeight="bold">
                VS
              </Text>
              <div className="flex justify-center items-center space-x-1">
                <Image
                  boxSize="20px"
                  src={match.awayLogo}
                  alt={match.awayName}
                  borderRadius="full"
                />
                <Text>{match?.awayGoal}</Text>
              </div>
              <div className="flex space-x-2">
                {/* <IconButton
                // variant="outline"
                colorScheme="green"
                aria-label="Select Match"
                fontSize="20px"
                isRound
                size="xs"
                icon={<BiCheck />}
              
              /> */}
                {/* icon logic to display */}
                {match?.status == "FT" ? (
                  match?.actualAwayGoal == match?.awayGoal &&
                  match?.actualHomeGoal == match?.homeGoal ? (
                    <Icon as={BiCheck} color="green" />
                  ) : (
                    <Icon as={MdClose} color="red" />
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllUsersPredictions;
