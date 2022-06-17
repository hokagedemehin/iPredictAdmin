import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { useUser } from '../../../utils/context/userContext';
const qs = require('qs');

const CardMatches = ({ data: cardInfo }) => {
  const router = useRouter();
  const { userDoc } = useUser();
  const toast = useToast();
  const [formValue, setFormValue] = useState({
    country: '',
    team: '',
    advantage: '',
    matchDate: null,
  });
  // console.log(cardInfo);
  const [countryList, setCountryList] = useState([]);
  const [teamInfo, setTeamInfo] = useState([]);

  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  const { data: countryData, isSuccess: countrySuccess } = useQuery(
    'countries',
    async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`)
  );
  useEffect(() => {
    if (countrySuccess) {
      let tempArr = [];
      countryData.data.data.forEach((country) => {
        let newObj = { ...country?.attributes, id: country.id };
        tempArr.push(newObj);
      });
      setCountryList(tempArr);
    }
  }, [countrySuccess]);

  const handleForm = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleCountry = async (e) => {
    e.preventDefault();
    setFormValue({ ...formValue, country: e.target.value });
    const query = qs.stringify(
      {
        filters: {
          countryName: {
            $eq: e.target.value,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    const { data: teamData } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams?${query}`
    );

    let tempArr = [];
    if (teamData.data.length > 0) {
      teamData?.data.forEach((team) => {
        let newObj = { ...team?.attributes, id: team.id };
        tempArr.push(newObj);
      });
    } else {
      toast({
        title: 'No Teams Found',
        description: 'Please try again',
        status: 'info',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    }
    setTeamInfo(tempArr);
  };

  const handleSubmit = async (formValue) => {
    if (
      formValue.country &&
      formValue.team &&
      formValue.matchDate &&
      formValue.advantage
    ) {
      // get all the user's card that is this team
      // #####################################################
      // const queryUser = qs.stringify(
      //   {
      //     filters: {
      //       name: {
      //         $eq: cardInfo?.attributes?.name,
      //       },
      //     },
      //   },
      //   {
      //     encodeValuesOnly: true,
      //   }
      // );
      // const { data: cardData } = await axios.get(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards?${queryUser}`
      // );
      // let cardIds = [];
      // cardData.data.data.forEach((card) => {
      //   cardIds.push(card.id);
      // });
      // #####################################################

      // get the latest match from database and set to false
      // #######################################################3
      const query = qs.stringify(
        {
          filters: {
            latest: {
              $eq: true,
            },
            cardName: {
              $eq: cardInfo.attributes.name,
            },
          },
          sort: ['id:desc'],
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-card-matches?${query}`
      );
      if (data.data.length > 0) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-card-matches/${data.data[0].id}`,
          {
            data: {
              latest: false,
            },
          }
        );
      }
      // ############################################################

      // get user logo
      // ###############################################3
      const teamDetails = teamInfo.filter(
        (team) => team.name == formValue?.team
      );

      const teamLogo = teamDetails[0]?.logo;
      // ###################################################

      // send new match to database
      // #############################################################
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-card-matches`,
        {
          data: {
            cardName: cardInfo?.attributes?.name,
            cardLogo: cardInfo?.attributes?.logo,
            advantage: formValue?.advantage,
            matchDate: formValue?.matchDate,
            opponentName: formValue?.team,
            opponentLogo: teamLogo,
            result: 'not played',
            team_card: [cardInfo?.id],
            latest: true,
          },
        }
      );
      // #############################################################
      setFormValue({
        country: '',
        team: '',
        advantage: '',
        matchDate: null,
      });
      toast({
        title: 'Match Added',
        description: 'Match has been added to the database',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
      router.push(`/teamcard/view/${cardInfo?.attributes?.season}`);
    } else {
      toast({
        title: 'Please fill all fields',
        description: 'Please try again',
        status: 'info',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout name='Add Team Card' desc='I-Predict Add Card'>
      <NavHeader />
      <div className='mx-4'>
        <div className='text my-5 text-center'>
          <div className='my-2 mx-auto flex max-w-xl'>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() =>
                router.push(`/teamcard/view/${cardInfo?.attributes?.season}`)
              }
              className='mx-4 sm:mx-0'
            >
              Back
            </Button>
          </div>
          <Heading>Add Card Match</Heading>
        </div>
        <div className='mx-auto flex max-w-xl flex-col items-center justify-around space-y-2 space-x-0 pb-6 sm:flex-row sm:space-y-0 sm:space-x-3'>
          {/* card details */}
          <div className='flex flex-col items-center'>
            <div className='relative h-14 w-14'>
              <Image
                layout='fill'
                objectFit='contain'
                src={cardInfo?.attributes?.logo}
                alt={cardInfo?.attributes?.name}
              />
            </div>
            <Text className='pb-3 text-xl font-bold'>
              {cardInfo?.attributes?.name}
            </Text>
          </div>
          <Text className='text-lg font-black sm:text-2xl'>VS</Text>
          {/* Match */}
          <div className='flex w-fit flex-col items-center space-y-2'>
            <FormControl>
              <FormLabel htmlFor='country'>Country</FormLabel>
              <Select
                id='country'
                name='country'
                onChange={handleCountry}
                placeholder='Select Country'
                value={formValue?.country}
              >
                {countryList.map((elem, index) => (
                  <option key={index} value={elem?.name}>
                    {elem?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {teamInfo.length > 0 && (
              <FormControl>
                <FormLabel htmlFor='team'>Team</FormLabel>
                <Select
                  id='team'
                  name='team'
                  onChange={handleForm}
                  placeholder='Select Team'
                >
                  {teamInfo.map((elem, index) => (
                    <option key={index} value={elem?.name}>
                      {elem?.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
            {formValue?.team && (
              <FormControl>
                <FormLabel htmlFor='advantage'>Team</FormLabel>
                <Select
                  id='advantage'
                  name='advantage'
                  onChange={handleForm}
                  placeholder='Home or Away'
                >
                  <option value='home'>Home</option>
                  <option value='away'>Away</option>
                </Select>
              </FormControl>
            )}
            {formValue?.team && (
              <FormControl>
                <FormLabel htmlFor='matchDate'>Match Date</FormLabel>
                <Input
                  id='matchDate'
                  name='matchDate'
                  type='datetime-local'
                  onChange={handleForm}
                />
              </FormControl>
            )}
            {formValue?.matchDate && (
              <Button
                variant='outline'
                colorScheme='teal'
                onClick={async () => await handleSubmit(formValue)}
              >
                Add Match
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CardMatches;

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards/${params.cardMatch}?populate=*`
  );
  // let newData = {
  //   id: data.id,
  //   ...data.attributes,
  // };

  return {
    props: {
      // data: [newData],
      // data: data?.data?.attributes,
      data: data?.data,
    },
  };
}
