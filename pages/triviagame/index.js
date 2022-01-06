import { Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
import MainPageContent from "../../components/triviagames/mainpage.content.component";

const TrivisGamesPage = () => {
  return (
    <Layout name="trivas" desc="I-Predict Trivas Game">
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>Trivis Game</Heading>
        </div>
        <MainPageContent />
      </div>
    </Layout>
  );
};

export default TrivisGamesPage;
