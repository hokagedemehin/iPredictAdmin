import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
import MainPageContent from "../../components/triviagames/mainpage.content.component";
import { useUser } from "../../utils/context/userContext";

const TrivisGamesPage = () => {
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
      <div className="">
        <div className="text my-5 text-center">
          <Heading>Trivas Game</Heading>
        </div>
        <MainPageContent />
      </div>
    </Layout>
  );
};

export default TrivisGamesPage;
