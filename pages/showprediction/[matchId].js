import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
import AllUsersPredictions from "../../components/showpredictions/allpredictions.component";
import GetAllPredictions from "../../utils/matches/getallpredictions";

const AllUsersPredictionComponent = () => {
  const router = useRouter();
  const Id = router.query.matchId;

  const [predictions, setPredictions] = useState([]);

  const getpredict = async () => {
    await GetAllPredictions(setPredictions, Id);
  };
  useEffect(() => {
    if (Id) {
      getpredict();
    }
  }, [Id]);

  // Object.entries(predictions?.predictInfo).forEach(([key, value]) =>
  //   console.log(key, value)
  // );
  const data = predictions.predictInfo || {};

  // console.log("prediction doc: ", predictions);
  return (
    <Layout name="predictions" desc="See all Users Predictions">
      <NavHeader />
      <div className="max-w-sm mx-auto">
        <div className="text text-center my-5">
          <Heading>All Predictions</Heading>
        </div>

        <div className="flex flex-col space-y-3 mx-2 justify-center items-center">
          {data &&
            Object.entries(data).map(([key, value]) =>
              value.map((pred, index) => (
                <AllUsersPredictions
                  key={index}
                  pred={pred}
                  email={key}
                  Id={Id}
                />
              ))
            )}
        </div>
      </div>
    </Layout>
  );
};

export default AllUsersPredictionComponent;
