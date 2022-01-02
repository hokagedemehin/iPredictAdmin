import axios from "axios";

const UpdateMatches = async (fixtureId) => {
  // FIXME:
  // TODO:
  // * -
  // ?

  /**
   * ? Steps to take in this utility function
   * * Map through each match in the array and call the fixtures API with the fixture ID
   * * The result is returned and sent to the same match and updates the scores
   * * then the right firestore collection and document is updated with the right the given score
   */

  const options = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_RAPID_API_FIXTURE_URL,
    params: { id: fixtureId },
    headers: {
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  };

  // axios.request(options).then(function (response) {
  // 	console.log(response.data);
  // }).catch(function (error) {
  // 	console.error(error);
  // });

  try {
    const { data } = await axios.request(options);
    // console.log("Update API: ", data);
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: updatematches.js ~ line 27 ~ UpdateMatches ~ error",
      error
    );
    // toast.error("💥There was an error accessing this link 😪😥💥");
  }
};

export default UpdateMatches;
