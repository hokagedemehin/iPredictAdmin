import axios from "axios";
import { useToast } from "@chakra-ui/react";

const listofmatches = async () => {
  const toast = useToast();
  const options = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_RAPID_API_URL,
    params: { league: "39", season: "2020" },
    headers: {
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  };
  try {
    const { data } = await axios.request(options);
    console.log("rapid data: ", data);
  } catch (error) {
    console.log(
      "🚀 ~ file: listofmatches.js ~ line 18 ~ listofmatches ~ error",
      error
    );
    // console.error(error)
    toast({
      title: "Rapid API error 🚨",
      description: "There was an error somewhere check the link again",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  return data;
  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
};

export default listofmatches;
