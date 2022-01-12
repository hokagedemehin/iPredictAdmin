import { Image, Text } from "@chakra-ui/react";
import React from "react";

const NoSearchResult = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 mx-2 mb-4 mt-2">
      <Image
        src="/predictandwin/NoSearchResult.png"
        borderRadius="md"
        boxSize="200px"
        alt="No search result"
        fallbackSrc="https://via.placeholder.com/200"
      />
      <Text fontSize="lg" fontWeight="bold">
        No Question was found
      </Text>
    </div>
  );
};

export default NoSearchResult;
