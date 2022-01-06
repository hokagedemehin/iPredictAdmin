import { Text } from "@chakra-ui/react";
import React from "react";

const ViewOneQuestionComponent = ({ ques }) => {
  // console.log(ques);
  return (
    <div>
      <div className="flex p-3 shadow-md rounded-lg cursor-pointer ">
        <Text isTruncated fontSize="lg">
          {ques.question}
        </Text>
      </div>
    </div>
  );
};

export default ViewOneQuestionComponent;
