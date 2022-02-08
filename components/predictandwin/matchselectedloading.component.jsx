import { Image, Skeleton, Text } from "@chakra-ui/react";

const MatchesSelectedSkeletonComponent = () => {
  return (
    <div className="mx-2">
      <Text fontSize="md" fontWeight="black" py="2" textAlign="center">
        Selected Matches
      </Text>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {[0, 1, 2, 3].map((matt, index) => (
          <Skeleton
            key={index}
            className="flex w-fit items-center justify-center space-x-3 rounded-md p-1 ring-1"
            // style={{ width: "fit-content" }}
          >
            <div className="flex items-center justify-center space-x-1">
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
            <div className="flex items-center justify-center space-x-1">
              <Image
                boxSize="20px"
                src={matt.awayLogo}
                alt={matt.awayName}
                borderRadius="full"
              />
              <Text>{!matt?.awayGoal ? 0 : matt?.awayGoal}</Text>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default MatchesSelectedSkeletonComponent;
