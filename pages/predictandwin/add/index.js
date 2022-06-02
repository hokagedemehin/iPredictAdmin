// import { Text } from '@chakra-ui/react';
// import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
const qs = require('qs');
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiSoccerBall } from 'react-icons/gi';
import { nanoid } from 'nanoid';
import SelectedMatches from '../../../components/predictandwin/selected.matches.component';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

const AddNewMatch = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    matchName: '',
  });
  const [countryValue, setCountryValue] = useState({
    homeCountry: '',
    awayCountry: '',
  });
  const [matchOption, setMatchOption] = useState('');
  const [countryTeams, setCountryTeams] = useState({
    homeCountry: '',
    awayCountry: '',
    matchDate: null,
  });
  // const [showOption, setShowOption] = useState('')
  // const [teamList, setTeamList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [awayTeamList, setAwayTeamList] = useState([]);
  const [homeTeamList, setHomeTeamList] = useState([]);
  const [selectedMatches, setSelectedMatches] = useState([]);
  console.log('countryList :>> ', countryList);
  console.log('matchOption :>>', matchOption);
  // console.log('formValue', formValue);
  console.log('selectedMatches', selectedMatches);

  const handleOptions = (e) => {
    setMatchOption(e.target.value);
  };
  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleCountrySelection = (e) => {
    e.preventDefault();
    setCountryTeams({ ...countryTeams, [e.target.name]: e.target.value });
  };

  const homeTeamFilter = async (e) => {
    e.preventDefault();
    setCountryValue({ ...countryValue, homeCountry: e.target.value });
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
    // console.log('teamData', teamData);
    let tempArr = [];
    if (teamData.data.length > 0) {
      teamData?.data.forEach((team) => {
        let newObj = { ...team?.attributes, id: team.id };
        tempArr.push(newObj);
      });
    } else {
      toast.info('No Team Found');
    }
    setHomeTeamList(tempArr);
  };

  const awayTeamFilter = async (e) => {
    e.preventDefault();
    setCountryValue({ ...countryValue, awayCountry: e.target.value });
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
    // console.log('teamData', teamData);
    let tempArr = [];
    if (teamData.data.length > 0) {
      teamData?.data.forEach((team) => {
        let newObj = { ...team?.attributes, id: team.id };
        tempArr.push(newObj);
      });
    } else {
      toast.info('No Team Found');
    }
    setAwayTeamList(tempArr);
  };

  const handleSelectedMatches = async (form) => {
    try {
      const id = nanoid();
      const homeTeamInfo = homeTeamList.filter(
        (team) => team.name == form.homeTeam
      );
      const awayTeamInfo = awayTeamList.filter(
        (team) => team.name == form.awayTeam
      );

      const homeLogo = homeTeamInfo[0].logo;
      const awayLogo = awayTeamInfo[0].logo;

      const newMatch = {
        id,
        ...form,
        homeLogo,
        awayLogo,
        matchDate: form.matchDate,
      };
      setSelectedMatches([...selectedMatches, newMatch]);
      setFormValue({ matchName: '' }); // reset form
      setCountryValue({
        homeCountry: '',
        awayCountry: '',
      }); // reset form
      setHomeTeamList([]); // reset form
      setAwayTeamList([]); // reset form
    } catch (error) {
      console.error(error);
    }
  };
  const handleCountryMatches = async (form, formValue) => {
    try {
      const id = nanoid();
      const homeTeamInfo = countryList.filter(
        (team) => team.name == form.homeCountry
      );
      const awayTeamInfo = countryList.filter(
        (team) => team.name == form.awayCountry
      );

      const homeLogo = homeTeamInfo[0].flag;
      const awayLogo = awayTeamInfo[0].flag;
      const homeTeam = form?.homeCountry;
      const awayTeam = form?.awayCountry;
      const matchName = formValue?.matchName;
      const newMatch = {
        id,
        homeTeam,
        awayTeam,
        homeLogo,
        awayLogo,
        matchName,
        matchDate: form.matchDate,
      };
      setSelectedMatches([...selectedMatches, newMatch]);
      setFormValue({ matchName: '' }); // reset form
      // setCountryValue({
      //   homeCountry: '',
      //   awayCountry: '',
      // }); // reset form
      setCountryTeams({
        homeCountry: '',
        awayCountry: '',
        matchDate: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { data: countryData, isSuccess: countrySuccess } = useQuery(
    'countries',
    async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries`)
  );
  // console.log(countryData);
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

  return (
    <Layout name='add matches' desc='I-Predict Matches Updating'>
      <NavHeader />
      <div className='mx-auto max-w-2xl space-y-4 py-4'>
        <div className='mx-4 flex w-full'>
          <Button
            leftIcon={<BiArrowBack />}
            variant='ghost'
            onClick={() => router.push('/predictandwin')}
          >
            Back
          </Button>
        </div>
        <Text className='mx-2 py-4 text-2xl font-bold sm:text-4xl'>
          New Matches
        </Text>
        <div className='mx-2 flex flex-col space-y-3'>
          {/* select options */}
          <div className='flex w-full'>
            <Select
              id='matchOptions'
              name='matchOptions'
              onChange={handleOptions}
              placeholder='Select Match Options'
              value={matchOption}
            >
              <option value='club'>Club</option>
              <option value='country'>Country</option>
            </Select>
          </div>
          {/* Match Name || option selection */}
          <FormControl isRequired>
            <FormLabel htmlFor='matchName'>Match Name</FormLabel>
            <Input
              onChange={handleForm}
              value={formValue?.matchName}
              id='matchName'
              name='matchName'
              placeholder='Match name'
            />
          </FormControl>
        </div>
        {/* ####################################################################### */}
        {/*  club selection workflow */}
        {matchOption === 'club' && (
          <div className='flex flex-col'>
            <Text className='mx-2 py-4 text-xl font-bold sm:text-2xl'>
              Club Matches
            </Text>
            <div className='mx-2 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              {/* home selection */}
              <div className='flex w-full flex-col space-y-4'>
                <Select
                  id='homeCountry'
                  name='homeCountry'
                  onChange={homeTeamFilter}
                  placeholder='Select Home Country'
                  value={countryValue.homeCountry}
                >
                  {countryList.map((elem, index) => (
                    <option key={index} value={elem?.name}>
                      {elem?.name}
                    </option>
                  ))}
                </Select>

                {/* Home Team Selection */}
                {homeTeamList.length > 0 && (
                  <Select
                    id='homeTeam'
                    name='homeTeam'
                    onChange={handleForm}
                    placeholder='Select Home Team'
                    // value={formValue.homeTeam}
                  >
                    {homeTeamList.map((elem, index) => (
                      <option key={index} value={elem?.name}>
                        {elem?.name}
                      </option>
                    ))}
                  </Select>
                )}
              </div>

              <Text className='text-xl font-bold'>VS</Text>

              {/* away selection */}
              <div className='flex-flex-col w-full space-y-4'>
                <Select
                  id='awayCountry'
                  name='awayCountry'
                  onChange={awayTeamFilter}
                  placeholder='Select Away Country'
                  value={countryValue.awayCountry}
                >
                  {countryList.map((elem, index) => (
                    <option key={index} value={elem?.name}>
                      {elem?.name}
                    </option>
                  ))}
                </Select>

                {/* Away Team Selection */}
                {awayTeamList.length > 0 && (
                  <Select
                    id='awayTeam'
                    name='awayTeam'
                    onChange={handleForm}
                    placeholder='Select Away Team'
                    // value={formValue.awayTeam}
                  >
                    {awayTeamList.map((elem, index) => (
                      <option key={index} value={elem?.name}>
                        {elem?.name}
                      </option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className='mx-2 flex w-fit flex-col space-y-4'>
              {formValue?.homeTeam && formValue?.awayTeam && (
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
              {formValue?.homeTeam && formValue?.awayTeam && (
                <Button
                  onClick={() => handleSelectedMatches(formValue)}
                  colorScheme='blue'
                  leftIcon={<GiSoccerBall />}
                >
                  Add Selection
                </Button>
              )}
            </div>
          </div>
        )}
        {/* ########################################################################### */}
        {/* ########################################################################## */}
        {/* country selection workflow */}
        {matchOption === 'country' && (
          <div className='flex flex-col'>
            <Text className='mx-2 py-4 text-xl font-bold sm:text-2xl'>
              Country Matches
            </Text>

            {/* home and away selection */}
            <div className='mx-2 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              {/* home selection */}
              <div className='flex w-full flex-col space-y-4'>
                <Select
                  id='homeCountry'
                  name='homeCountry'
                  onChange={handleCountrySelection}
                  placeholder='Select Home Country'
                  value={countryTeams.homeCountry}
                >
                  {countryList.map((elem, index) => (
                    <option key={index} value={elem?.name}>
                      {elem?.name}
                    </option>
                  ))}
                </Select>
              </div>

              <Text className='text-xl font-bold'>VS</Text>

              {/* away selection */}
              <div className='flex-flex-col w-full space-y-4'>
                <Select
                  id='awayCountry'
                  name='awayCountry'
                  onChange={handleCountrySelection}
                  placeholder='Select Away Country'
                  value={countryTeams.awayCountry}
                >
                  {countryList.map((elem, index) => (
                    <option key={index} value={elem?.name}>
                      {elem?.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* date and submission */}
            <div className='mx-2 flex w-fit flex-col space-y-4'>
              {countryTeams?.homeCountry && countryTeams?.awayCountry && (
                <FormControl>
                  <FormLabel htmlFor='matchDate'>Match Date</FormLabel>
                  <Input
                    id='matchDate'
                    name='matchDate'
                    type='datetime-local'
                    onChange={handleCountrySelection}
                  />
                </FormControl>
              )}
              {countryTeams?.homeCountry && countryTeams?.awayCountry && (
                <Button
                  onClick={() => handleCountryMatches(countryTeams, formValue)}
                  colorScheme='blue'
                  leftIcon={<GiSoccerBall />}
                >
                  Add Selection
                </Button>
              )}
            </div>
          </div>
        )}
        {/* ########################################################################### */}

        {selectedMatches.length > 0 && (
          <SelectedMatches
            matchSelect={selectedMatches}
            setSelectedMatches={setSelectedMatches}
            setMatchOption={setMatchOption}
          />
        )}
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default AddNewMatch;
