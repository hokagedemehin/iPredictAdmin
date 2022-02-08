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
      <div className="mx-4 flex flex-wrap items-center justify-center gap-4">
        <div
          className="cursor-pointer rounded-lg px-10 py-4 text-center shadow-md "
          onClick={(e) => handleClick(e, "/triviagame/addquestion")}
        >
          <Text fontSize="xl" className="font-bold">
            Add Question
          </Text>
        </div>
        <div
          className="cursor-pointer rounded-lg px-10 py-4 text-center shadow-md "
          onClick={(e) => handleClick(e, "/triviagame/questions")}
        >
          <Text fontSize="xl" className="font-bold">
            View Questions
          </Text>
        </div>
        {/* <div
          className='px-10 py-4 shadow-md rounded-lg cursor-pointer text-center '
          onClick={(e) => handleClick(e, '/triviaattempts')}
        >
          <Text fontSize='xl' className='font-bold'>
            View Attempts
          </Text>
        </div> */}
      </div>
    </div>
  );
};

export default MainPageContent;
