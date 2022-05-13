import {
  Button,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
// import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import moment from 'moment';
const qs = require('qs');

const ViewSelectedMatches = ({ data }) => {
  const router = useRouter();
  // const [value, setValue] = useState('not played');
  const [matches] = useState(data?.attributes?.matches?.data);
  const [matchesUpdate, setMatchesUpdate] = useState([]);
  // console.log(data);
  // console.log('mathces: ', matches);
  const handleResults = (value, id) => {
    // e.preventDefault();
    // console.log('e', e);
    // matches.forEach((match) => {
    //   if (match.id == id) {
    //     match.attributes.result = value;
    //   }
    // });
    const updatedMatch = matches.filter((match) => match.id == id);
    updatedMatch[0].attributes.result = value;
    const otherMatches = matches.filter((match) => match.id != id);
    // setMatches([...otherMatches, ...updatedMatch]);
    setMatchesUpdate([...otherMatches, ...updatedMatch]);
  };

  const handleUpdate = async () => {
    matchesUpdate.forEach(async (match) => {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/matches/${match.id}`,
        {
          data: {
            result: match.attributes.result,
          },
        }
      );
      const query = qs.stringify(
        {
          filters: {
            strapiMatchId: {
              $eq: match.id,
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-matches?${query}`
      );

      data?.data?.forEach(async (userMatch) => {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-matches/${userMatch.id}`,
          {
            data: {
              result: match.attributes.result,
            },
          }
        );
      });
    });
    router.push(`/predictandwin/view`);
  };

  return (
    <div className='mx-4'>
      <Button
        variant='ghost'
        leftIcon={<BiArrowBack />}
        className='mb-5'
        onClick={() => router.push(`/predictandwin/view`)}
      >
        Back
      </Button>
      <div className='flex flex-col items-center justify-center space-y-3'>
        {matches?.map((elem) => (
          <div
            key={elem.id}
            className='flex flex-col space-y-4 rounded-md border p-2 shadow-md sm:p-3'
          >
            <div className='flex justify-center text-base font-bold'>
              {moment(elem?.attributes?.matchDate).format(
                'MMMM Do YYYY, h:mm:ss a'
              )}
            </div>
            <div
              // key={elem.id}
              className='flex w-fit flex-col space-y-3 '
            >
              <div
                // key={elem.id}
                className='flex  items-center justify-center space-x-3  '
                // style={{ width: "fit-content" }}
              >
                <div className='flex items-center justify-center space-x-1'>
                  <Image
                    boxSize={['20px', '30px', '40px']}
                    src={elem.attributes.homeLogo}
                    alt={elem.attributes.homeName}
                    borderRadius='full'
                  />
                  <Text fontSize={['md', 'lg', 'xl']}>
                    {elem.attributes?.homeName}
                  </Text>
                </div>
                <Text fontSize={['xs', 'md', 'lg']} fontWeight='bold'>
                  VS
                </Text>
                <div className='flex items-center justify-center space-x-1'>
                  <Image
                    boxSize={['20px', '30px', '40px']}
                    src={elem.attributes.awayLogo}
                    alt={elem.attributes.awayName}
                    borderRadius='full'
                  />
                  <Text fontSize={['md', 'lg', 'xl']}>
                    {elem.attributes?.awayName}
                  </Text>
                </div>
              </div>
              <div className='flex space-x-2'>
                <Text>Result: </Text>
                <RadioGroup
                  onChange={(e) => handleResults(e, elem.id)}
                  value={elem.attributes.result}
                >
                  <Stack direction='row'>
                    <Radio value='home'>Home</Radio>
                    <Radio value='away'>Away</Radio>
                    <Radio value='draw'>Draw</Radio>
                    <Radio value='not played'>Not Played</Radio>
                  </Stack>
                </RadioGroup>
              </div>
            </div>
          </div>
        ))}
        <Button
          variant='outline'
          colorScheme='blue'
          mr={3}
          onClick={handleUpdate}
        >
          Update Matches
        </Button>
        {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
            Clear Selection
          </Button> */}
      </div>
    </div>
  );
};

export default ViewSelectedMatches;
