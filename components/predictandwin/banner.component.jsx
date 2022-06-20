import {
  Box,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  Skeleton,
  Text,
  useToast,
  // useEditableControls,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import BannerUpdate from '../../utils/matches/banner/bannerUpdate';
// import GetBanner from '../../utils/matches/banner/getBanner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const qs = require('qs');

const BannerPredictAndWin = () => {
  const [buttonLoad, setButtonLoad] = useState(false);
  // const [bannerData, setBannerData] = useState([]);
  const toast = useToast();

  const { isLoading, data, isSuccess } = useQuery(
    'prediction-prize',
    async () => {
      const query = qs.stringify(
        {
          sort: ['id:desc'],

          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict-banners?${query}`
      );

      let newData = {
        id: data.data[0].id,
        ...data.data[0].attributes,
      };
      return newData;
    }
  );

  const [formValue, setFormValue] = useState({
    prize: '',
    people: '',
    coins: '',
  });

  console.log(formValue);
  // console.log('data :>> ', data);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleCoins = (value) => {
    // const value = e.target.value;
    setFormValue({ ...formValue, coins: +value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValue);
    if (
      formValue.prize != '' &&
      formValue.people != '' &&
      formValue.coins != 0
    ) {
      // console.log('here');
      await BannerUpdate(formValue, setButtonLoad);
    } else {
      toast({
        title: 'Missing Fields',
        description: 'Please fill all the fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <div>
      <div className='mx-auto mb-10 flex max-w-sm flex-col space-y-2 rounded-lg bg-gradient-to-r from-purple-700 to-blue-600 px-5  py-5 text-white shadow-md sm:px-10'>
        <Text className='text-base font-semibold'>This week prize winning</Text>
        <Text className='font-semibold'>current prize: {data?.prize}</Text>
        <Box className=''>
          {isLoading && (
            <Skeleton className='h-10 w-full'>Input Value</Skeleton>
          )}
          {isSuccess && (
            <Input
              value={formValue?.prize ?? '20,000'}
              id='prize'
              name='prize'
              onChange={(e) => handleChange(e)}
            />
          )}
          {/* <Button colorScheme='teal' onSubmit={(e) => handleSubmit(e)}>
            Change
          </Button> */}
        </Box>
        <Text className='font-semibold'>This week prediction coins</Text>
        <Text className='font-semibold'>current coins: {data?.coins}</Text>

        <Box className=''>
          {isLoading && (
            <Skeleton className='h-10 w-full'>Input Value</Skeleton>
          )}
          {isSuccess && (
            <NumberInput
              defaultValue={formValue?.coins ?? 20}
              min={0}
              id='coins'
              name='coins'
              onChange={(e) => handleCoins(e)}
            >
              <NumberInputField />
            </NumberInput>
          )}
          {/* <Button colorScheme='teal' onSubmit={(e) => handleSubmit(e)}>
            Change
          </Button> */}
        </Box>

        <Text className='font-semibold'>Number of people</Text>
        <Text className='font-semibold'>current people: {data?.people}</Text>

        <Box className='space-y-3'>
          {isLoading && (
            <Skeleton className='h-10 w-full'>Input Value</Skeleton>
          )}
          {isSuccess && (
            <Input
              value={formValue?.people ?? '10'}
              id='people'
              name='people'
              onChange={(e) => handleChange(e)}
            />
          )}
          <Button
            colorScheme='teal'
            onClick={(e) => handleSubmit(e)}
            isLoading={buttonLoad}
            loadingText='Changing'
          >
            Change
          </Button>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BannerPredictAndWin;
