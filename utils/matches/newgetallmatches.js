import axios from 'axios';
const qs = require('qs');
const NewGetAllMatches = async () => {
  const query = qs.stringify(
    {
      sort: ['date:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches?${query}`
  );
  return data?.data;
};

export default NewGetAllMatches;
