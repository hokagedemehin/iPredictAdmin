import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Button,
  Heading,
  Input,
  Text,
  useDisclosure,

  // useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import UserCardsComponent from '../../../components/teamcard/UserCards';
import NoSearchResult from '../../../components/triviagames/nosearchresult.component';
import { useUser } from '../../../utils/context/userContext';
// import { useQuery } from 'react-query';

const qs = require('qs');

const ViewCardYearComponent = ({ data }) => {
  // console.log('data :>> ', data);
  const router = useRouter();
  const { userDoc } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [usersCard, setUsersCard] = useState({});

  const handleUsersCard = (card) => {
    onOpen();
    setUsersCard(card);
  };

  const thousands = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // console.log(router);

  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  let data1 = [];

  if (data.length !== 0) {
    data1 = data.filter((val) => {
      if (searchTerm == '' || searchTerm.length === 0) {
        return val;
      } else if (
        val.name &&
        val.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      ) {
        return val;
      }
    });
  }

  return (
    <Layout
      name='View Season Team Card'
      desc='I-Predict Particular season card'
    >
      <NavHeader />
      <div className='mx-4 pb-6'>
        <div className='text my-5 text-center'>
          <div className='my-2 mx-auto flex max-w-xl justify-between'>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/teamcard/view')}
              className='mx-4 sm:mx-0'
            >
              Back
            </Button>
          </div>
          <Heading>View Team Card</Heading>
        </div>
        <div className=' mx-auto flex w-fit max-w-xl justify-center py-4'>
          <Input
            placeholder='search teams'
            type='search'
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className='flex flex-wrap justify-center gap-3'>
          {data1.length !== 0 ? (
            data1.map((card) => (
              <div
                key={card?.id}
                className='relative w-[22rem] overflow-hidden rounded-md border shadow-md'
              >
                {/* backround image */}
                <div className='absolute -left-36 top-5 '>
                  <div className='relative h-80 w-80'>
                    <Image
                      layout='fill'
                      objectFit='contain'
                      src={card?.logo}
                      alt={card?.name}
                      className=' opacity-10'
                    />
                  </div>
                </div>
                {card?.type === 'premium' && (
                  <div className='absolute top-0 right-0 rounded-bl-md bg-black px-2 py-0.5'>
                    <div className=''>
                      <Text className='bg-gradient-to-r from-amber-500 via-yellow-200 to-yellow-500 bg-clip-text text-base font-bold text-transparent'>
                        Premium
                      </Text>
                    </div>
                  </div>
                )}
                <div className='flex flex-col items-center px-4 pt-4'>
                  <div className='relative h-20 w-20'>
                    <Image
                      layout='fill'
                      objectFit='contain'
                      src={card?.logo}
                      alt={card?.name}
                    />
                  </div>
                  <Text className='break-all pb-3 text-2xl font-bold'>
                    {card?.name}
                  </Text>
                </div>
                <div className='bg-gray-100   '>
                  <div className='text-center text-lg font-medium'>
                    <Text>{`Season's`}</Text>
                    <Text className='-mt-1'>Cash out Worth</Text>
                    <Text className='text-2xl font-bold'>
                      &#8358;{thousands(card?.worth)}
                    </Text>
                  </div>
                  {/* value | win | loss | reward */}
                  <div className='flex justify-between bg-blue-600 px-4 py-2 text-white'>
                    <div className='flex flex-col items-center justify-center'>
                      <Text>Value</Text>
                      <Text className='-mt-2 text-xs'>(coins)</Text>
                      <Text className='font-bold'>
                        {thousands(card?.value)}
                      </Text>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <Text>Win</Text>
                      <Text className='-mt-2 text-xs'>(cash)</Text>
                      <Text className='font-bold'>
                        +{thousands(card?.winCash)}
                      </Text>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <Text>Loss</Text>
                      <Text className='-mt-2 text-xs'>(coins)</Text>
                      <Text className='font-bold'>
                        -{thousands(card?.loss)}
                      </Text>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <Text className=''>Total Reward</Text>
                      <Text className='-mt-2 text-xs'>(cash)</Text>

                      <Text className='font-bold'>
                        &#8358;{thousands(card?.worth)}
                      </Text>
                    </div>
                  </div>
                  {/* matches button */}
                  <div className='flex flex-col p-4'>
                    <div className='flex items-center justify-center space-x-5 py-3'>
                      <Button
                        colorScheme='telegram'
                        variant='solid'
                        onClick={() =>
                          router.push(`/teamcard/match/${card?.id}`)
                        }
                      >
                        Add Match
                      </Button>
                      <Button
                        colorScheme='yellow'
                        variant='solid'
                        onClick={() =>
                          router.push(`/teamcard/view/match/${card?.id}`)
                        }
                      >
                        View Match
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleUsersCard(card)}
                      ref={btnRef}
                      variant='outline'
                      colorScheme='teal'
                    >
                      Subscribed Users
                    </Button>
                  </div>
                </div>
                <Text className='bg-slate-600 py-3 text-center text-xs text-white'>
                  {`This card is valid for ${card?.season} season`}
                </Text>
              </div>
            ))
          ) : (
            <NoSearchResult />
          )}
        </div>
      </div>
      <UserCardsComponent
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        card={usersCard}
      />
    </Layout>
  );
};

export default ViewCardYearComponent;

export async function getServerSideProps({ params }) {
  const query = qs.stringify(
    {
      filters: {
        season: {
          $eq: params?.year,
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards?${query}`
  );

  let newData = {};
  let newArr = [];

  data.data.forEach((doc) => {
    newData = {
      id: doc.id,

      ...doc.attributes,
    };
    newArr.push(newData);
  });
  return {
    props: {
      data: newArr,
    },
    // revalidate: 5,
  };
}
