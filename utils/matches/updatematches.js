import axios from "axios";

const UpdateMatches = async (fixtureId) => {
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
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: updatematches.js ~ line 27 ~ UpdateMatches ~ error",
      error
    );
    toast.error("💥There was an error accessing this link 😪😥💥");
  }
};

export default UpdateMatches;
