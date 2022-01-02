import { db } from "../firebase/firebase";
// import moment from "moment";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  getDoc,
  // setDoc,
} from "firebase/firestore";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const UpdateScoreToFirestore = async (match) => {
  /**
   * * First find the right subdocument
   * * Then update it
   */
  // console.log("update match: ", match);
  try {
    const allRef = collection(db, "MatchesSelected");
    const collectionQuery = query(allRef, where("confirmed", "==", true));

    const collectionSnapshot = await getDocs(collectionQuery);
    // console.log(collectionSnapshot);
    // let docInfo = "";
    let collectionID = "";
    collectionSnapshot.forEach((oneDoc) => {
      // docInfo = oneDoc.data().predictInfo;
      collectionID = oneDoc.id;
    });
    // console.log("collection ID", collectionID);
    // const mom = moment(collectionID).format("MMM Do YY");
    // console.log(mom);
    // console.log(new Date(collectionID));

    // const matchDate = moment(dateID.toDate()).format("MMM Do, YY, h:mm:ss a");
    // console.log(matchDate);
    const predictRef = collection(
      db,
      "MatchesSelected",
      collectionID,
      `Matches`
    );

    const subCollectionQuery = query(
      predictRef,
      where("homeName", "==", match.homeName)
    );
    const subCollectionSnapshot = await getDocs(subCollectionQuery);
    // let subCollectionRef = ""
    subCollectionSnapshot.forEach(async (oneDoc) => {
      const subCollectionRef = doc(
        db,
        "MatchesSelected",
        collectionID,
        `Matches`,
        oneDoc.id
      );
      await updateDoc(subCollectionRef, {
        homeGoal: match?.homeGoal,
        awayGoal: match?.awayGoal,
        status: match?.status,
      });

      // const result = await getDoc(subCollectionRef);
      // console.log("update result: ", result.data());
    });

    // * get all emails and check if that email has made a prediction with this match

    const predictedMatchRef = doc(db, "PredictedMatches", collectionID);

    const predictMatchDoc = await getDoc(predictedMatchRef);
    // console.log("predict match: ", predictMatchDoc.data());

    if (predictMatchDoc.exists()) {
      const docRef = predictMatchDoc.data().predictInfo;

      // console.log("docref: ", docRef);
      for (const [key, value] of Object.entries(docRef)) {
        // console.log("Key: ", key, "value: ", value);
        value.forEach(async (eachDoc) => {
          const matchRef = collection(db, key, collectionID, eachDoc);
          const specificMatch = query(
            matchRef,
            where("homeName", "==", match.homeName)
          );
          const matchSnapshot = await getDocs(specificMatch);
          matchSnapshot.forEach(async (updateMatch) => {
            // console.log(updateMatch.id);
            // console.log("selected key: ", key);
            // console.log("selected value: ", eachDoc);
            // console.log(
            //   "selected Key: ",
            //   key,
            //   "selected Value: ",
            //   eachDoc,
            //   "match ID: ",
            //   updateMatch.id
            // );
            const matchSubCollectionRef = doc(
              db,
              key,
              collectionID,
              eachDoc,
              updateMatch.id
            );
            // console.log("matchSUb: ", matchSubCollectionRef);
            try {
              await updateDoc(
                matchSubCollectionRef,
                {
                  actualHomeGoal: match?.homeGoal,
                  actualAwayGoal: match?.awayGoal,
                  status: match?.status,
                }
                // { merge: true }
              );
            } catch (error) {
              console.error("update err: ", error);
            }
          });
        });
      }
    }
    // toast.success("⚽ Updated successfully");
  } catch (error) {
    console.error("update firestore", error);
  }
};

export default UpdateScoreToFirestore;
