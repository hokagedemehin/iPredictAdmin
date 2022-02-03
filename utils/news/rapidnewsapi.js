import axios from 'axios';

const categories = [
  { football: '2021020913320920836' },
  { transfer: '2022010516022274132' },
  { uefa: '2021082315501532387' },
];

// console.log('categories :>> ', categories[0].football);

const RapidNewsApi = async () => {
  var options = {
    method: 'GET',
    url: 'https://livescore6.p.rapidapi.com/news/v2/list-by-sport',
    params: { category: categories[0].football, page: '1' },
    headers: {
      'x-rapidapi-host': 'livescore6.p.rapidapi.com',
      'x-rapidapi-key': '92eb5bac5bmshac4b56879acd72ap1261d0jsn53033be39bf2',
    },
  };

  const response = await axios.request(options);
  const data = await response.data;
  console.log('rapid data:', data);
  return data;
};

export default RapidNewsApi;
