import axios from 'axios';
import SetApiCount from '../context/setApiCount';

// const categories = [
//   { football: '2021020913320920836' },
//   { transfer: '2022010516022274132' },
//   { uefa: '2021082315501532387' },
// ];

// console.log('categories :>> ', categories[0].football);

const RapidNewsApi = async (formValue, setLoading) => {
  var options = {
    method: 'GET',
    url: 'https://livescore6.p.rapidapi.com/news/v2/list-by-sport',
    params: { category: formValue?.newSection, page: '1' },
    headers: {
      'x-rapidapi-host': 'livescore6.p.rapidapi.com',
      'x-rapidapi-key': '92eb5bac5bmshac4b56879acd72ap1261d0jsn53033be39bf2',
    },
  };
  try {
    setLoading(true);
    const { data } = await axios.request(options);
    // const response = await axios.request(options);
    // const data = await response.data;
    // console.log('Update API: ', data);
    await SetApiCount('news');
    return data;
  } catch (error) {
    console.error('🚀 news error', error);
  } finally {
    setLoading(false);
  }
};

export default RapidNewsApi;
