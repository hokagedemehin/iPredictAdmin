import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetCompetitions = async (formValue, setleagueLoading, setLeagueList) => {
  const options = {
    method: 'GET',
    url: process.env.NEXT_PUBLIC_RAPID_API_LEAGUES_URL,
    // params: { code: formValue?.countryCode },
    params: { country: formValue?.countryName },
    headers: {
      'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  };
  try {
    setleagueLoading(true);
    if (formValue?.countryName && formValue?.year) {
      const { data: leagues } = await axios.request(options);
      // console.log('leagues :>> ', leagues);
      let tempArr = [];
      leagues?.response.forEach((elem) => {
        tempArr.push(elem.league);
      });
      setLeagueList(tempArr);
    } else {
      toast.error('Select a country & year');
    }
    //  countries?.response.forEach(async (elem) => {
    //    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`, {
    //      data: {
    //        name: elem.name,
    //        code: elem.code,
    //        flag: elem.flag,
    //      },
    //    });
    //  });
  } catch (error) {
    console.error(error);
  } finally {
    setleagueLoading(false);
  }
};

export default GetCompetitions;
