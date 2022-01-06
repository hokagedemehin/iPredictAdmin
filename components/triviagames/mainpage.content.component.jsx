import { Text } from "@chakra-ui/react";
import React from "react";

const MainPageContent = () => {
  return (
    <div>
      <div className="flex flex-col mx-4 space-y-7">
        <div className="p-3 shadow-md rounded-lg cursor-pointer text-center w-full">
          <Text fontSize="xl" className="font-bold">
            Add Question
          </Text>
        </div>
        <div className="p-3 shadow-md rounded-lg cursor-pointer text-center w-full">
          <Text fontSize="xl" className="font-bold">
            View Questions
          </Text>
        </div>
        <div className="p-3 shadow-md rounded-lg cursor-pointer text-center w-full">
          <Text fontSize="xl" className="font-bold">
            View Attempts
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;
