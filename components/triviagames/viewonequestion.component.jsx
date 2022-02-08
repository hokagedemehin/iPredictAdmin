import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const ViewOneQuestionComponent = ({ ques }) => {
  const router = useRouter();
  // console.log(ques);
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <div>
      <div
        className="flex cursor-pointer rounded-lg p-3 shadow-md "
        onClick={(e) => handleClick(e, `/triviagame/questions/${ques?.ID}`)}
      >
        <Text isTruncated fontSize="lg">
          {ques?.question}
        </Text>
      </div>
    </div>
  );
};

export default ViewOneQuestionComponent;
