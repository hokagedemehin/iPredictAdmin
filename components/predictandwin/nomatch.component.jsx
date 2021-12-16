import { Image, Text } from "@chakra-ui/react";

const NoMatchComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 mx-2 mb-6 mt-2">
      <Image
        src="/predictandwin/nomatch.png"
        borderRadius="md"
        boxSize="200px"
        alt="No matches available"
        fallbackSrc="https://via.placeholder.com/200"
      />
      <div className="text-center">
        <Text fontSize="lg" fontWeight="bold">
          No Matches available
        </Text>
        <Text fontSize="md" fontWeight="bold">
          Please try another country or date range
        </Text>
      </div>
    </div>
  );
};

export default NoMatchComponent;
