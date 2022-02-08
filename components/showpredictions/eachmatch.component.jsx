// import { Text } from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
const EachMatchSelected = ({ match }) => {
  const router = useRouter();
  const dat = moment(match?.createdAt.toDate()).format("MMM Do YY");
  return (
    <div>
      <div
        className="w-fit cursor-pointer rounded-md p-2 shadow-md "
        onClick={() => router.push(`/showprediction/${match?.ID}`)}
      >
        <p>Match for {dat}</p>
      </div>
    </div>
  );
};

export default EachMatchSelected;
