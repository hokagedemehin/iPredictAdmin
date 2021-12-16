import { db } from "../firebase/firebase";

import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import moment from "moment";

// import {
//   collection,
//   addDoc,
//   setDoc,
//   getDocs,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   query,
//   where,
// } from "firebase/firestore";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const UpdateScoreToFirestore = async (match) => {
  /**
   * * First find the right subdocument
   * * Then update it
   */

  try {
    const allRef = collection(db, "MatchesSelected");
    const collectionQuery = query(allRef, where("confirmed", "==", true));

    const collectionSnapshot = await getDocs(collectionQuery);
    // console.log(collectionSnapshot);
    let dateID = "";
    let collectionID = "";
    collectionSnapshot.forEach((oneDoc) => {
      dateID = oneDoc.data().createdAt;
      collectionID = oneDoc.id;
    });

    console.log(dateID, collectionID);
    const matchDate = moment(dateID.toDate()).format("MMM Do, YY, h:mm:ss a");
    console.log(matchDate);
    const predictRef = collection(
      db,
      "MatchesSelected",
      collectionID,
      `Match - ${matchDate}`
    );

    const subCollectionQuery = query(
      predictRef,
      where("homeName", "==", match.homeName)
    );
    const subCollectionSnapshot = await getDocs(subCollectionQuery);
    // let subCollectionRef = ""
    subCollectionSnapshot.forEach(async (oneDoc) =>
      // dateID = oneDoc.data().createdAt
      {
        const subCollectionRef = doc(
          db,
          "MatchesSelected",
          collectionID,
          `Match - ${matchDate}`,
          oneDoc.id
        );
        await updateDoc(subCollectionRef, {
          homeGoal: match?.homeGoal,
          awayGoal: match?.awayGoal,
        });

        const result = await getDoc(subCollectionRef);
        console.log("update result: ", result.data());
      }
    );
    // const subCollectionRef = collection(
    //   db,
    //   "MatchesSelected",
    //   collectionSnapshot.id,
    //   `Match - ${matchDate}`,
    //   subCollectionSnapshot.id
    // );

    // const resultRef = doc(subCollectionRef);
    // const result = getDoc(resultRef);
    // console.log("update util: ", result.data());
  } catch (error) {
    console.error(error);
  }
};

export default UpdateScoreToFirestore;
