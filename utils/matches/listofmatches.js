// import React, { useState } from "react";
import axios from 'axios';
// import { useToast } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SetApiCount from '../context/setApiCount';

const listofmatches = async (formValue, setisLoading) => {
  setisLoading(true);
  // const toast = useToast();
  const { country, startdate, enddate } = formValue;

  const options = {
    method: 'GET',
    url: process.env.NEXT_PUBLIC_RAPID_API_URL,
    params: { league: country, season: '2021', from: startdate, to: enddate },
    headers: {
      'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  };
  try {
    const { data } = await axios.request(options);
    await SetApiCount('matches');
    // console.log(data);
    return data;
  } catch (error) {
    console.error(
      'π ~ file: listofmatches.js ~ line 18 ~ listofmatches ~ error',
      error
    );
    toast.error('π₯There was an error accessing this link πͺπ₯π₯');
  } finally {
    setisLoading(false);
  }
};

export default listofmatches;
