// import { Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import React from "react";

const EachMatchSkeletonSelected = () => {
  return (
    <Skeleton>
      <div className="w-full cursor-pointer rounded-md p-4 shadow-md ">
        <p>Match for a specific</p>
      </div>
    </Skeleton>
  );
};

export default EachMatchSkeletonSelected;
