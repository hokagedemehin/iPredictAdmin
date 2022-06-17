import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  // Input,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/context/userContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiCardJoker } from 'react-icons/gi';
const qs = require('qs');

const AddTeamCard = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  const toast_chakra = useToast();
  const [formValue, setFormValue] = useState({
    cardType: '',
    country: '',
    team: '',
    cardYear: '',
    cardWorth: '',
    cardPrice: '',
    cardValue: '',
    cardWin: '',
    cardLoss: '',
  });
  const [countryList, setCountryList] = useState([]);
  const [teamInfo, setTeamInfo] = useState([]);

  // console.log('formValue :>> ', formValue);
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
    // console.log(e.target);
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleCardYear = (e) => {
    setFormValue({ ...formValue, cardYear: e.target.value });
  };
  const handleCardWorth = (value) => {
    setFormValue({ ...formValue, cardWorth: +value });
  };
  const handleBuyingPrice = (value) => {
    setFormValue({ ...formValue, cardPrice: +value });
  };
  const handleCardValue = (value) => {
    setFormValue({ ...formValue, cardValue: +value });
  };
  const handleCardWinCoins = (value) => {
    setFormValue({ ...formValue, cardWinCoins: +value });
  };
  const handleCardWinCash = (value) => {
    setFormValue({ ...formValue, cardWinCash: +value });
  };
  const handleCardLoss = (value) => {
    setFormValue({ ...formValue, cardLoss: +value });
  };

  const handleCountry = async (e) => {
    e.preventDefault();
    //  setCountryValue({ ...countryValue, homeCountry: e.target.value });
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
    setTeamInfo(tempArr);
  };

  const handleSubmit = async (formValue) => {
    const teamDetails = teamInfo.filter((team) => team.name == formValue?.team);
    const year = formValue?.cardYear;
    const teamLogo = teamDetails[0]?.logo;
    // console.log('teamLogo', teamLogo);
    const {
      cardType,
      country,
      team,
      cardYear,
      cardWorth,
      cardPrice,
      cardValue,
      cardWinCoins,
      cardWinCash,
      cardLoss,
    } = formValue;
    if (
      cardType == '' ||
      country == '' ||
      team == '' ||
      cardValue == '' ||
      cardWinCoins == '' ||
      cardWinCash == '' ||
      cardLoss == '' ||
      cardWorth == '' ||
      cardPrice == '' ||
      cardYear == ''
    ) {
      toast.error('Please Fill All Fields');
    } else {
      const queryUser = qs.stringify(
        {
          // sort: ['id:desc'],
          filters: {
            name: {
              $eq: formValue?.team,
            },
            type: {
              $eq: formValue?.cardType,
            },
            latest: {
              $eq: true,
            },
          },
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data: prevCard } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards?${queryUser}`
      );
      // console.log('prevCard', prevCard);
      if (prevCard.data.length > 0) {
        // toast.error('Card Already Exists');
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards/${prevCard.data[0]?.id}`,
          {
            data: {
              latest: false,
            },
          }
        );
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards`,
        {
          data: {
            name: formValue?.team,
            logo: teamLogo,
            type: formValue?.cardType,
            season: formValue?.cardYear,
            value: formValue?.cardValue,
            winCoins: formValue?.cardWinCoins,
            winCash: formValue?.cardWinCoins,
            loss: formValue?.cardLoss,
            country: formValue?.country,
            worth: formValue?.cardWorth,
            price: formValue?.cardPrice,
            latest: true,
          },
        }
      );
      setFormValue({
        cardType: '',
        country: '',
        team: '',
        cardYear: '',
        cardWorth: '',
        cardPrice: '',
        cardValue: '',
        cardWinCoins: '',
        cardWinCash: '',
        cardLoss: '',
      });
      // console.log('res', res);
      toast_chakra({
        title: 'Card added Succesfully.',
        description: "You'll be redirected to the team page.",
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      router.push(`/teamcard/view/${year}`);
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
              onClick={() => router.push('/teamcard')}
              className='mx-4 sm:mx-0'
            >
              Back
            </Button>
          </div>
          <Heading>Add New Card</Heading>
        </div>
        <div className='mx-auto flex max-w-2xl flex-col space-y-4 pb-8'>
          {/* card type || country */}
          <div className='flex w-fit flex-wrap space-y-4'>
            <FormControl>
              <FormLabel htmlFor='cardType'>Card Type</FormLabel>
              <Select
                id='cardType'
                name='cardType'
                placeholder='Select Card Type'
                onChange={handleForm}
                value={formValue?.cardType}
                className='w-fit'
              >
                <option value='standard'>Standard</option>
                <option value='premium'>Premium</option>
              </Select>
            </FormControl>
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
          </div>
          {/* team */}
          <div className='w-fit'>
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
          </div>
          {/* value || win || loss */}
          <div className='flex w-fit flex-col space-y-4'>
            <FormControl>
              <FormLabel htmlFor='cardYear'>Enter Card Year</FormLabel>

              <Input
                onChange={handleCardYear}
                id='cardYear'
                name='cardYear'
                value={formValue?.cardYear}
                placeholder='22-23'
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='cardWorth'>Enter Card Worth</FormLabel>

              <NumberInput
                min={0}
                onChange={handleCardWorth}
                id='cardWorth'
                name='cardWorth'
                value={formValue?.cardWorth}
              >
                <NumberInputField placeholder='Enter Card Worth' />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='cardPrice'>Enter Card Buying Price</FormLabel>

              <NumberInput
                min={0}
                onChange={handleBuyingPrice}
                id='cardPrice'
                name='cardPrice'
                value={formValue?.cardPrice}
              >
                <NumberInputField placeholder='Enter Buying Price' />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='cardValue'>Enter Card Value</FormLabel>

              <NumberInput
                min={0}
                onChange={handleCardValue}
                id='cardValue'
                name='cardValue'
                value={formValue?.cardValue}
              >
                <NumberInputField placeholder='Enter Card Value' />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='cardWinCoins'>
                Enter Card Win (coins)
              </FormLabel>

              <NumberInput
                min={0}
                onChange={handleCardWinCoins}
                id='cardWinCoins'
                name='cardWinCoins'
                value={formValue?.cardWinCoins}
              >
                <NumberInputField placeholder='Enter Card Win Value' />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='cardWin'>Enter Card Win (cash)</FormLabel>

              <NumberInput
                min={0}
                onChange={handleCardWinCash}
                id='cardWinCash'
                name='cardWinCash'
                value={formValue?.cardWinCash}
              >
                <NumberInputField placeholder='Enter Card Win Value' />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='cardLoss'>Enter Card Loss</FormLabel>

              <NumberInput
                min={0}
                onChange={handleCardLoss}
                id='cardLoss'
                name='cardLoss'
                value={formValue?.cardLoss}
              >
                <NumberInputField placeholder='Enter Card Loss Value' />
              </NumberInput>
            </FormControl>
          </div>
          <div className='w-fit'>
            <Button
              colorScheme='blue'
              variant='solid'
              leftIcon={<GiCardJoker />}
              onClick={async () => handleSubmit(formValue)}
            >
              Add Card
            </Button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default AddTeamCard;
