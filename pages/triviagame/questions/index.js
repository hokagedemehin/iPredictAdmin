import { Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../../../components/layout/layout";
import NavHeader from "../../../components/nav/header.component";
import ViewQuestionsContent from "../../../components/triviagames/viewquestions.component";

const ViewQuestionsPage = () => {
  return (
    <Layout name="trivas" desc="I-Predict Trivas Game">
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>View Questions</Heading>
          <ViewQuestionsContent />
        </div>
      </div>
    </Layout>
  );
};

export default ViewQuestionsPage;
