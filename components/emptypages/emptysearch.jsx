import { Image, Text } from "@chakra-ui/react";
import React from "react";

const NoSearchResult = () => {
  return (
    <div className="mx-2 mb-4 mt-2 flex flex-col items-center justify-center space-y-5">
      <Image
        src="/predictandwin/NoSearchResult.png"
        borderRadius="md"
        boxSize={["200px", "300px"]}
        objectFit="cover"
        alt="No search result"
        fallbackSrc="https://via.placeholder.com/250?text=I-Predict"
      />
      <Text fontSize="lg" fontWeight="bold">
        No Attempt was found
      </Text>
    </div>
  );
};

export default NoSearchResult;
