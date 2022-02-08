import { Button, Heading, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";
// import GetOneAttemptQuestions from '../../utils/trivia/attempts/getOneAttempt';
import { ArrowBackIcon } from "@chakra-ui/icons";
import GetUserAttemptQuestions from "../../../utils/trivia/attempts/getUserAttempt";
import { useUser } from "../../../utils/context/userContext";
import Layout from "../../../components/layout/layout";
import NavHeader from "../../../components/nav/header.component";
import AttemptedQuestionsPageComponent from "../../../components/triviagames/attempts/attempted.questions";

const TriviaGamesPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  const { attemptID, email } = router.query;
  // const email = user?.email;
  const [question, setQuestion] = useState([]);

  const { isLoading, data, isSuccess } = useQuery(
    ["attempted-questions", attemptID, email],
    async () => await GetUserAttemptQuestions(attemptID, email),
    { enabled: !![attemptID, email] }
  );
  // console.log(router.query);
  useEffect(() => {
    if (!userDoc || userDoc.role !== "admin") {
      // router.back();
      router.push("/login");
      // console.log("no admin");
    }
  }, [userDoc]);

  useEffect(() => {
    if (isSuccess) {
      const newArr = [];

      data?.forEach((doc) => newArr.push(doc.data()));

      setQuestion(newArr);
    }
  }, [isSuccess]);

  return (
    <Layout name="trivia-attempts" desc="I-Predict Trivia Attempts">
      <NavHeader />
      <div className="">
        <div className="my-2 mx-auto flex max-w-xl">
          <Button
            variant="link"
            leftIcon={<ArrowBackIcon />}
            onClick={() => router.push("/triviaattempts")}
            className="mx-4 sm:mx-0"
          >
            Back
          </Button>
        </div>
        <div className="text my-5 text-center">
          <Heading size="md">Attempted Questions</Heading>
        </div>
        <div className="mx-auto max-w-xl space-y-4">
          {isLoading &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((ques, index) => (
              <Skeleton key={index} className="rounded-lg">
                <div className="flex p-3 shadow-md  ">
                  <Text isTruncated fontSize="lg">
                    {ques}
                  </Text>
                </div>
              </Skeleton>
            ))}
        </div>
        <div className=" mx-auto max-w-xl space-y-2">
          {isSuccess &&
            question.map((ques, index) => (
              <AttemptedQuestionsPageComponent
                ques={ques}
                key={ques?.ID}
                index={index}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default TriviaGamesPage;
