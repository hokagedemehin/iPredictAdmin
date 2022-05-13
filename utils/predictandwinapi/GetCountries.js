import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetCountries = async (setIsLoadings) => {
  const options = {
    method: 'GET',
    url: process.env.NEXT_PUBLIC_RAPID_API_COUNTRY_URL,
    // params: { league: country, season: '2021', from: startdate, to: enddate },
    headers: {
      'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  };
  try {
    setIsLoadings(true);
    const { data: countries } = await axios.request(options);
    // console.log('countries :>> ', countries);
    const { data: countriesData } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`
    );
    // console.log(countriesData);
    if (countries.results > countriesData.data.length) {
      countries?.response.forEach(async (elem) => {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`,
          {
            data: {
              name: elem.name,
              code: elem.code,
              flag: elem.flag,
            },
          }
        );
      });
    } else {
      toast.info('Already have all countries');
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadings(false);
  }
};

export default GetCountries;
