import { Skeleton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetQuestionsFromFirebase from "../../utils/trivia/getQuestions";
import QuestionSearch from "./searchquestion.component";
import ViewOneQuestionComponent from "./viewonequestion.component";

const ViewQuestionsContent = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log("questions: ", questions);
  const getQues = async () => {
    GetQuestionsFromFirebase(setQuestions);
  };

  let data = [];

  if (questions.length !== 0) {
    data = questions.filter((val) => {
      if (searchTerm == "" || searchTerm.length === 0) {
        return val;
      } else if (
        val.question &&
        val.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
    });
  }

  useEffect(() => {
    getQues();
  }, []);

  // console.log(data.length !== 0);

  return (
    <div className="mx-4 my-2">
      {/* Search bar here */}
      <QuestionSearch setSearchTerm={setSearchTerm} />
      <div className="mt-8 space-y-4">
        {data.length !== 0
          ? data.map((ques, index) => (
              <ViewOneQuestionComponent key={index} ques={ques} />
            ))
          : [1, 2, 3].map((ques, index) => (
              <Skeleton key={index}>
                <div className="flex p-3 shadow-md rounded-lg cursor-pointer ">
                  <Text isTruncated fontSize="lg">
                    {ques}
                  </Text>
                </div>
              </Skeleton>
            ))}
      </div>
    </div>
  );
};

export default ViewQuestionsContent;
