import { Button, Select, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { GiEarthAfricaEurope, GiTrophy, GiDatabase } from 'react-icons/gi';
import GetCountries from '../../../utils/predictandwinapi/GetCountries';
import { useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetCompetitions from '../../../utils/predictandwinapi/GetCompetitions';
import SaveTeamToDatabase from '../../../utils/predictandwinapi/saveTeamToDatabase';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

const UpdateDatabase = () => {
  const router = useRouter();
  const [isLoadings, setIsLoadings] = useState(false);
  const [leagueLoading, setleagueLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [formValue, setFormValue] = useState({
    countryName: '',
    year: '',
    leagueCode: '',
  });
  const [leagueList, setLeagueList] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  // console.log('countryList', countryList);
  // console.log('leagueList', leagueList);
  // console.log('formValue', formValue);
  const handleCountry = async () => {
    await GetCountries(setIsLoadings);
  };

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleCompetitions = async () => {
    await GetCompetitions(formValue, setleagueLoading, setLeagueList);
  };

  const handleTeams = async () => {
    const selectedCountry = countryList.filter(
      (country) => country.name == formValue.countryName
    );
    // console.log('selectedCountry', selectedCountry[0]);
    SaveTeamToDatabase(
      formValue,
      setTeamLoading,
      selectedCountry[0].id,
      setFormValue,
      setLeagueList
    );
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

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  return (
    <Layout name='database-update' desc='I-Predict Predict and win update'>
      <NavHeader />
      <div className='my-8 mx-auto max-w-md space-y-4'>
        <div className='mx-4 flex w-full'>
          <Button
            leftIcon={<BiArrowBack />}
            variant='ghost'
            onClick={() => router.push('/predictandwin')}
          >
            Back
          </Button>
        </div>
        <Text className='mx-2 py-4 text-center text-2xl font-bold sm:text-4xl'>
          Team Database Update
        </Text>
        {/* Get all countries from api */}
        <div className='flex w-full'>
          <Button
            leftIcon={<GiEarthAfricaEurope />}
            colorScheme='purple'
            variant='outline'
            isFullWidth
            fontSize='xl'
            onClick={handleCountry}
            isLoading={isLoadings}
            loadingText='Loading'
            spinnerPlacement='end'
          >
            Get Countries
          </Button>
        </div>
        <div className='flex space-x-2'>
          {/* country select */}
          {countryList.length > 0 && (
            // <div className='flex flex-wrap gap-4'>
            <Select
              name='countryName'
              id='countryName'
              placeholder='Select a country'
              onChange={handleForm}
              value={formValue.countryName}
            >
              {countryList.map((elem, index) => (
                <option key={index} value={elem?.name}>
                  {elem?.name}
                </option>
              ))}
            </Select>
            // </div>
          )}
          <Select
            id='year'
            name='year'
            onChange={handleForm}
            placeholder='Select a year'
            value={formValue.year}
          >
            {range(2021, 2100).map((elem) => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </Select>
        </div>
        {/* get all competitions */}
        <Button
          leftIcon={<GiTrophy />}
          colorScheme='blue'
          variant='outline'
          isFullWidth
          fontSize='xl'
          onClick={handleCompetitions}
          isLoading={leagueLoading}
          loadingText='Loading'
          spinnerPlacement='end'
        >
          Get Leagues / Cups
        </Button>
        {leagueList.length > 0 && (
          <div className='flex flex-col space-y-4'>
            <Select
              name='leagueCode'
              id='leagueCode'
              placeholder='Select a League'
              onChange={handleForm}
              value={formValue.leagueCode}
            >
              {leagueList.map((elem, index) => (
                <option key={index} value={elem?.id}>
                  {elem?.name}
                </option>
              ))}
            </Select>
            <Button
              leftIcon={<GiDatabase />}
              colorScheme='teal'
              variant='solid'
              isFullWidth
              fontSize='xl'
              onClick={handleTeams}
              isLoading={teamLoading}
              loadingText='Loading'
              spinnerPlacement='end'
            >
              Add Teams to Database
            </Button>
          </div>
        )}
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default UpdateDatabase;
