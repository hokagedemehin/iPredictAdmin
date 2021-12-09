import { Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";

const PredictAndWinPage = () => {
  return (
    <Layout>
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>Predict & Win</Heading>
        </div>
        {/* <ContentComponent /> */}
      </div>
    </Layout>
  );
};

export default PredictAndWinPage;
