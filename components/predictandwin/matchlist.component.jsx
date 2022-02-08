import React from "react";
import { Box, IconButton, Image, Text } from "@chakra-ui/react";
// import { CheckCircleIcon, SmallCloseIcon } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { MdClose } from "react-icons/md";
// import addMatchToFirestore from "../../utils/matches/addMatchToFIrestore";

const MatchListComponent = ({ matches, setMatchSelect, matchSelect }) => {
  // console.log("🚀 ~ file: matchlist.component.jsx ~ line 8 ~ MatchListComponent ~ matches", matches)
  // Logo Home Team vs Away Team Logo
  // console.log(matches);
  const match = !matches ? {} : matches;

  const addSelection = async () => {
    // await addMatchToFirestore(match);
    setMatchSelect([
      ...matchSelect,
      {
        fixtureId: match?.fixture?.id,
        homeGoal: match?.goals?.home,
        awayGoal: match?.goals?.away,
        leagueId: match?.league?.id,
        country: match?.league?.country,
        leagueName: match?.league?.name,
        homeName: match?.teams?.home?.name,
        homeLogo: match?.teams?.home?.logo,
        awayLogo: match?.teams?.away?.logo,
        awayName: match?.teams?.away?.name,
        homeWinner: match?.teams?.home?.winner,
        awayWinner: match?.teams?.away?.winner,
        status: match?.fixture?.status?.short,
        matchDate: match?.fixture?.date,
      },
    ]);
  };

  const removeSelection = async () => {
    // await removeMatchFromFirestore(match);
    const newMatchSelect = matchSelect.filter(
      (mat) => mat.fixtureId != match?.fixture?.id
    );
    setMatchSelect(newMatchSelect);
  };

  return (
    <div className="flex items-center justify-between space-x-4 rounded-md p-2 shadow-md ring-1 ">
      <div className="flex w-fit items-center justify-center space-x-1">
        <Image
          boxSize={["20px", "30px", "40px"]}
          // src="/predictandwin/manu.png"
          src={match?.teams?.home?.logo}
          alt={match?.teams?.home?.name}
          borderRadius="full"
        />
        <Box>
          {/* <Text fontSize="sm">Manchester United</Text> */}
          <Text fontSize={["xs", "sm"]}>{match?.teams?.home?.name}</Text>
        </Box>
      </div>
      <div>
        <Text fontSize={["md", "lg"]} fontWeight="black">
          VS
        </Text>
      </div>
      <div className="flex w-fit items-center justify-center space-x-1">
        <Image
          boxSize={["20px", "30px", "40px"]}
          // src="/predictandwin/mancity.png"
          src={match?.teams?.away?.logo}
          alt={match?.teams?.away?.name}
          borderRadius="full"
        />
        <Box>
          {/* <Text fontSize="sm">Manchester City</Text> */}
          <Text fontSize={["xs", "sm"]}>{match?.teams?.away?.name}</Text>
        </Box>
      </div>
      <div className="flex space-x-2">
        <IconButton
          // variant="outline"
          colorScheme="green"
          aria-label="Select Match"
          fontSize="20px"
          isRound
          size="xs"
          icon={<BiCheck />}
          onClick={addSelection}
        />
        <IconButton
          // variant="outline"
          colorScheme="red"
          aria-label="Select Match"
          fontSize="20px"
          isRound
          size="xs"
          icon={<MdClose />}
          onClick={removeSelection}
        />
      </div>
    </div>
  );
};

export default MatchListComponent;
