import React, { useEffect, useState } from "react";
import GetQuestionsFromFirebase from "../../utils/trivia/getQuestions";
import QuestionSearch from "./searchquestion.component";
import ViewOneQuestionComponent from "./viewonequestion.component";

const ViewQuestionsContent = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("questions: ", questions);
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

  return (
    <div className="mx-4 my-2">
      {/* Search bar here */}
      <QuestionSearch setSearchTerm={setSearchTerm} />
      <div className="mt-8 space-y-4">
        {data.length !== 0 &&
          data.map((ques, index) => (
            <ViewOneQuestionComponent key={index} ques={ques} />
          ))}
      </div>
    </div>
  );
};

export default ViewQuestionsContent;
