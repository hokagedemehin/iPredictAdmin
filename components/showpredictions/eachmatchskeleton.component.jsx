// import { Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import React from "react";

const EachMatchSkeletonSelected = () => {
  return (
    <Skeleton>
      <div className="shadow-md rounded-md p-4 w-full cursor-pointer ">
        <p>Match for a specific</p>
      </div>
    </Skeleton>
  );
};

export default EachMatchSkeletonSelected;
