import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const MainPageContent = () => {
  const router = useRouter();

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <div>
      <div className="flex flex-col mx-4 space-y-7">
        <div
          className="p-3 shadow-md rounded-lg cursor-pointer text-center w-full"
          onClick={(e) => handleClick(e, "/triviagame/addquestion")}
        >
          <Text fontSize="xl" className="font-bold">
            Add Question
          </Text>
        </div>
        <div
          className="p-3 shadow-md rounded-lg cursor-pointer text-center w-full"
          onClick={(e) => handleClick(e, "/triviagame/viewquestions")}
        >
          <Text fontSize="xl" className="font-bold">
            View Questions
          </Text>
        </div>
        <div
          className="p-3 shadow-md rounded-lg cursor-pointer text-center w-full"
          onClick={(e) => handleClick(e, "/triviagame/viewattempts")}
        >
          <Text fontSize="xl" className="font-bold">
            View Attempts
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;
