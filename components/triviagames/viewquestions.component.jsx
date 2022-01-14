import { Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GetQuestionsFromFirebase from '../../utils/trivia/getQuestions';
import NoSearchResult from './nosearchresult.component';
import QuestionSearch from './searchquestion.component';
import ViewOneQuestionComponent from './viewonequestion.component';
// import { useRouter } from "next/router";

const ViewQuestionsContent = () => {
  // const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // console.log("router: ", router);
  // if (router?.components) {
  //   console.log("router: ", Object?.keys(router?.components).length);
  //   console.log("router: ", router?.components["/triviagames"]);
  // }
  // const getQues = async () => {
  //   GetQuestionsFromFirebase();
  // };

  // if (true) {
  const { isLoading, data, isSuccess, dataUpdatedAt } = useQuery(
    'viewquestions',
    async () => await GetQuestionsFromFirebase()
  );

  // if (isSuccess) {
  //   data.forEach((doc) => newArr.push(doc.data()));
  //   if (newArr.length !== 0) {
  //     setQuestions(newArr);
  //   }
  // }

  // console.log("isLoading: ", isLoading);
  // console.log("isError: ", isError);
  // console.log("data: ", data);
  // console.log("isSuccess: ", isSuccess);
  // console.log("isStale: ", isStale);
  // console.log("isFetched: ", isFetched);
  // }

  useEffect(() => {
    if (isSuccess) {
      const newArr = [];

      data.forEach((doc) => newArr.push(doc.data()));
      // if (newArr.length !== 0) {
      setQuestions(newArr);
      // }
    }
  }, [isSuccess, dataUpdatedAt]);

  let data1 = [];

  if (questions.length !== 0) {
    data1 = questions.filter((val) => {
      if (searchTerm == '' || searchTerm.length === 0) {
        return val;
      } else if (
        val.question &&
        val.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
    });
  }

  // useEffect(() => {
  //   getQues();
  // }, []);

  // console.log(data.length !== 0);

  return (
    <div className='mx-4 my-2'>
      {/* Search bar here */}
      <QuestionSearch setSearchTerm={setSearchTerm} />
      <div className='mt-8 space-y-4'>
        {isLoading ? (
          [1, 2, 3].map((ques, index) => (
            <Skeleton key={index}>
              <div className='flex p-3 shadow-md rounded-lg cursor-pointer '>
                <Text isTruncated fontSize='lg'>
                  {ques}
                </Text>
              </div>
            </Skeleton>
          ))
        ) : data1.length !== 0 ? (
          data1.map((ques, index) => (
            <ViewOneQuestionComponent key={index} ques={ques} />
          ))
        ) : (
          <NoSearchResult />
        )}
      </div>
    </div>
  );
};

export default ViewQuestionsContent;
