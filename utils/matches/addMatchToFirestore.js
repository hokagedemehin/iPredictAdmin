import { db } from "../firebase/firebase";
// import moment from "moment";

import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  updateDoc,
  // serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addMatchToFirestore = async (matchSelect, setIsConfirmed) => {
  setIsConfirmed(true);
  // console.log("match selcted: ", matchSelect);
  const nowDate = new Date();
  const docID = Date.now().toString();
  // console.log(nowDate);
  // const matchDate = selectedMatches
  // const matchDate = moment(nowDate).format("MMM Do, YY, h:mm:ss a");
  // console.log(matchDate);

  // Get all documents with previous confirmed status and turn them to false
  const allRef = collection(db, "MatchesSelected");
  const q = query(allRef, where("confirmed", "==", true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((oneDoc) =>
    updateDoc(doc(db, "MatchesSelected", oneDoc.id), {
      confirmed: false,
    })
  );

  const parentRef = doc(
    db,
    "MatchesSelected",
    docID
    // `Match - ${matchDate}`,
    // docID
  );

  const predictRef = collection(db, "MatchesSelected", docID, `Matches`);
  try {
    await setDoc(parentRef, {
      createdAt: nowDate,
      confirmed: true,
    });
    matchSelect.forEach(
      async (match) =>
        await addDoc(predictRef, {
          fixtureId: match?.fixtureId,
          homeGoal: match?.homeGoal,
          awayGoal: match?.awayGoal,
          leagueId: match?.leagueId,
          country: match?.country,
          leagueName: match?.leagueName,
          homeName: match?.homeName,
          homeLogo: match?.homeLogo,
          awayLogo: match?.awayLogo,
          awayName: match?.awayName,
          homeWinner: match?.homeWinner,
          awayWinner: match?.awayWinner,
          createdAt: nowDate,
          status: match?.status,
        })
    );

    const MatchDocRef = doc(db, "PredictedMatches", docID);
    await setDoc(
      MatchDocRef,
      {
        createdAt: nowDate,
        ID: docID,
      },
      { merge: true }
    );
    toast.success("✅ Added successfully");
    // console.log("data added successfully");
  } catch (err) {
    console.error("error - addMatchToFirestore", err);
  } finally {
    setIsConfirmed(false);
  }
};

export default addMatchToFirestore;
