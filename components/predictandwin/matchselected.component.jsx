import { Image, Text } from "@chakra-ui/react";
// import Image from "next/image";
import React from "react";

const MatchesSelectedComponent = () => {
  return (
    <div className="mx-2">
      <Text fontSize="sm" fontWeight="black" py="1">
        Selected Matches
      </Text>
      <div className="flex space-x-2">
        <div
          className="flex space-x-3 ring-1 w-fit p-1 rounded-md"
          // style={{ width: "fit-content" }}
        >
          <Image
            boxSize="20px"
            src="/predictandwin/manu.png"
            alt="Machester United"
            borderRadius="full"
          />
          <Text fontSize="xs" fontWeight="bold">
            VS
          </Text>
          <Image
            boxSize="20px"
            src="/predictandwin/mancity.png"
            alt="Machester United"
            borderRadius="full"
          />
        </div>
        <div
          className="flex space-x-3 ring-1 w-fit p-1 rounded-md"
          // style={{ width: "fit-content" }}
        >
          <Image
            boxSize="20px"
            src="/predictandwin/manu.png"
            alt="Machester United"
            borderRadius="full"
          />
          <Text fontSize="xs" fontWeight="bold">
            VS
          </Text>
          <Image
            boxSize="20px"
            src="/predictandwin/mancity.png"
            alt="Machester United"
            borderRadius="full"
          />
        </div>
        <div
          className="flex space-x-3 ring-1 w-fit p-1 rounded-md"
          // style={{ width: "fit-content" }}
        >
          <Image
            boxSize="20px"
            src="/predictandwin/manu.png"
            alt="Machester United"
            borderRadius="full"
          />
          <Text fontSize="xs" fontWeight="bold">
            VS
          </Text>
          <Image
            boxSize="20px"
            src="/predictandwin/mancity.png"
            alt="Machester United"
            borderRadius="full"
          />
        </div>
        <div
          className="flex space-x-3 ring-1 w-fit p-1 rounded-md"
          // style={{ width: "fit-content" }}
        >
          <Image
            boxSize="20px"
            src="/predictandwin/manu.png"
            alt="Machester United"
            borderRadius="full"
          />
          <Text fontSize="xs" fontWeight="bold">
            VS
          </Text>
          <Image
            boxSize="20px"
            src="/predictandwin/mancity.png"
            alt="Machester United"
            borderRadius="full"
          />
        </div>
      </div>
    </div>
  );
};

export default MatchesSelectedComponent;
