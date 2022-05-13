import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const qs = require('qs');

const SaveSelectionToDatabase = async (
  setIsLoadings,
  matchSelect,
  setSelectedMatches
) => {
  try {
    setIsLoadings(true);
    const query = qs.stringify(
      {
        filters: {
          latest: {
            $eq: true,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const { data: recentSelectedMatches } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches?${query}`
    );

    // console.log('recentSelectedMatches :>> ', recentSelectedMatches);

    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches/${recentSelectedMatches.data[0].id}`,
      {
        data: {
          latest: false,
        },
      }
    );

    const time = new Date();
    const { data: newSelectedMatch } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches`,
      {
        data: {
          date: time,
          latest: true,
          noOfMatches: matchSelect.length,
          name: matchSelect[0].matchName,
        },
      }
    );
    // console.log('newSelectedMatch :>> ', newSelectedMatch);
    matchSelect.forEach(async (elem) => {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/matches`, {
        data: {
          matchId: elem.id,
          awayLogo: elem.awayLogo,
          awayName: elem.awayTeam,
          homeLogo: elem.homeLogo,
          homeName: elem.homeTeam,
          matchDate: elem.matchDate,
          selected_match: [newSelectedMatch.data.id],
          name: elem.matchName,
        },
      });
    });
    toast.success('Added to Database Successfully');
    setSelectedMatches([]);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoadings(false);
  }
};

export default SaveSelectionToDatabase;
