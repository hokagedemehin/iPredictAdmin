import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../../components/layout/layout";
import NavHeader from "../../../components/nav/header.component";
import ViewQuestionsContent from "../../../components/triviagames/viewquestions.component";
import { useUser } from "../../../utils/context/userContext";

const ViewQuestionsPage = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!userDoc || userDoc.role !== "admin") {
      // router.back();
      router.push("/login");
      // console.log("no admin");
    }
  }, [userDoc]);

  return (
    <Layout name="trivas" desc="I-Predict Trivas Game">
      <NavHeader />
      <div className="mx-auto max-w-xl">
        <div className="text my-5 text-center">
          <Heading>View Questions</Heading>
          <ViewQuestionsContent />
        </div>
      </div>
    </Layout>
  );
};

export default ViewQuestionsPage;
