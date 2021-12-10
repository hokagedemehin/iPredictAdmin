// import React, { useState } from "react";
import axios from "axios";
// import { useToast } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import moment from "moment";

const listofmatches = async (formValue) => {
  // const toast = useToast();
  const { country, startdate, enddate } = formValue;
  const matchDay = moment(serverTimestamp()).format("MMM Do YY");
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
    // console.log("🚀 ~ file: listofmatches.js ~ line 18 ~ listofmatches ~ data", data)
    // console.log("rapid data: ", data.response);
    return data;
    // data?.response.forEach(
    //   async (match) =>
    //     await addDoc(collection(db, matchDay), {
    //       homeName: match.teams.home.name,
    //       homeLogo: match.teams.home.logo,
    //       awayName: match.teams.away.name,
    //       awayLogo: match.teams.away.logo,
    //       createdAt: serverTimestamp(),
    //       homeScore: match.score.fulltime.home ? match.score.fulltime.home : 0,
    //       awayScore: match.score.fulltime.away ? match.score.fulltime.away : 0,
    //     })
    // );
    // const docRef = await addDoc(collection(db, matchDay), {
    //   homeName: data.teams.home.name,
    //   homeLogo: data.teams
    // })
    // await setDoc(doc(db, email, docRef.id), { id: docRef.id }, { merge: true });
  } catch (error) {
    console.log(
      "🚀 ~ file: listofmatches.js ~ line 18 ~ listofmatches ~ error",
      error
    );
    toast.error("💥There was an error accessing this link 😪😥💥");
    // console.error(error)
    // toast({
    //   title: "Rapid API error 🚨",
    //   description: "There was an error somewhere check the link again",
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    // });
  }
  // return data;
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
