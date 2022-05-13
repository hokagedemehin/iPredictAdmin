import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const qs = require('qs');

const SaveTeamToDatabase = async (
  formValue,
  setTeamLoading,
  strapiId,
  setFormValue,
  setLeagueList
) => {
  const options = {
    method: 'GET',
    url: process.env.NEXT_PUBLIC_RAPID_API_TEAMS_URL,
    params: { league: formValue?.leagueCode, season: formValue?.year },
    headers: {
      'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  };
  try {
    setTeamLoading(true);
    if (formValue?.leagueCode && formValue?.year) {
      const { data: teams } = await axios.request(options);
      // console.log('teams :>> ', teams);

      // const query = qs.stringify(
      //   {
      //     filters: {
      //       name: {
      //         $eq: teams?.response[0]?.team?.name,
      //       },
      //     },
      //   },
      //   {
      //     encodeValuesOnly: true,
      //   }
      // );
      // const { data: teamExists } = await axios.get(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams?${query}`
      // );
      // console.log('teamExists :>> ', teamExists);

      teams?.response.forEach(async (elem) => {
        const query = qs.stringify(
          {
            filters: {
              name: {
                $eq: elem?.team?.name,
              },
            },
          },
          {
            encodeValuesOnly: true,
          }
        );
        const { data: teamExists } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams?${query}`
        );
        // console.log('teamExists :>> ', teamExists);
        if (teamExists.data.length == 0) {
          await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams`, {
            data: {
              teamId: elem.team.id,
              name: elem.team.name,
              code: elem.team.code,
              logo: elem.team.logo,
              countryName: elem.team.country,
              country: [strapiId],
            },
          });
        }
      });
      // let tempArr = [];
      // leagues?.response.forEach((elem) => {
      //   tempArr.push(elem.league);
      // });
      // setLeagueList(tempArr);
    } else {
      toast.error('Select a League & year');
    }
  } catch (error) {
    console.error(error);
  } finally {
    setTeamLoading(false);
    setFormValue({
      countryName: '',
      year: '',
      leagueCode: '',
    });
    setLeagueList([]);
  }
};

export default SaveTeamToDatabase;
