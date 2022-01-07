import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GetOneQuestionFromFirebase from "../../utils/trivia/getOneQuestion";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";

const OneQuestionComponent = () => {
  const router = useRouter();
  const { questionID } = router.query;
  // console.log(questionID);
  const [question, setQuestion] = useState([]);

  const getSpecificQuestion = async () => {
    await GetOneQuestionFromFirebase(setQuestion, questionID);
  };

  useEffect(() => {
    if (questionID) {
      getSpecificQuestion();
    }
  }, [questionID]);

  return (
    <div className="mt-4 mx-4 p-4 shadow-md rounded-xl">
      {question.length !== 0 && (
        <div className="space-y-2">
          {/* QUestion */}
          <div className="flex">
            <p className="text-xl">{question?.question}</p>
          </div>
          {/* OPtions */}
          <div className="flex flex-col space-y-1">
            <div className="flex space-x-2">
              <p>A.</p>
              <p>{question?.optionA}</p>
            </div>
            <div className="flex space-x-2">
              <p>B.</p>
              <p>{question?.optionB}</p>
            </div>
            <div className="flex space-x-2">
              <p>C.</p>
              <p>{question?.optionC}</p>
            </div>
            {/* ANswer */}
            <div className="flex space-x-2 font">
              <p>Answer :</p>
              <p>{question?.rightAnswer}</p>
            </div>
          </div>

          {/* Edit button */}
          <div className="flex justify-center items-center space-x-2">
            <Button
              isFullWidth
              colorScheme="teal"
              variant="outline"
              leftIcon={<BiArrowBack />}
              fontSize="xl"
              onClick={() => router.push("/triviagame/questions")}
            >
              Back
            </Button>
            <Button
              isFullWidth
              colorScheme="linkedin"
              variant="solid"
              rightIcon={<AiOutlineEdit />}
              fontSize="xl"
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneQuestionComponent;
