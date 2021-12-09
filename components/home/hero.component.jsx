import React from "react";
import { Flex, Box, Image, Square, Spacer, Text } from "@chakra-ui/react";
const HeroComponent = () => {
  return (
    <div className="">
      <Square my="8">
        <Image
          w="120px"
          // objectFit="cover"
          src="/logo/ipredict.png"
          alt="I-Pedict"
        />
      </Square>
    </div>
  );
};

export default HeroComponent;
