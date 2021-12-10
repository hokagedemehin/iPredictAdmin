import React from "react";
import { Box, IconButton, Image, Text } from "@chakra-ui/react";
// import { CheckCircleIcon, SmallCloseIcon } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const MatchListComponent = () => {
  // Logo Home Team vs Away Team Logo
  return (
    <div className="flex space-x-4 justify-center items-center mx-2 mt-5">
      <div className="flex justify-center items-center space-x-1 w-fit">
        <Image
          boxSize="20px"
          src="/predictandwin/manu.png"
          alt="Machester United"
          borderRadius="full"
        />
        <Box>
          <Text fontSize="sm">Manchester United</Text>
        </Box>
      </div>
      <div>
        <Text fontSize="lg" fontWeight="black">
          VS
        </Text>
      </div>
      <div className="flex justify-center items-center space-x-1 w-fit">
        <Image
          boxSize="20px"
          src="/predictandwin/mancity.png"
          alt="Machester United"
          borderRadius="full"
        />
        <Box>
          <Text fontSize="sm">Manchester City</Text>
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
          onClick={() => alert("added")}
        />
        <IconButton
          // variant="outline"
          colorScheme="red"
          aria-label="Select Match"
          fontSize="20px"
          isRound
          size="xs"
          icon={<MdClose />}
          onClick={() => alert("removed")}
        />
      </div>
    </div>
  );
};

export default MatchListComponent;
