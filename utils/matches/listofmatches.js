// import React, { useState } from "react";
import axios from "axios";
// import { useToast } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const listofmatches = async (formValue) => {
  // const toast = useToast();
  const { country, startdate, enddate } = formValue;

  const options = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_RAPID_API_URL,
    params: { league: country, season: "2021", from: startdate, to: enddate },
    headers: {
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: listofmatches.js ~ line 18 ~ listofmatches ~ error",
      error
    );
    toast.error("💥There was an error accessing this link 😪😥💥");
  }
};

export default listofmatches;
