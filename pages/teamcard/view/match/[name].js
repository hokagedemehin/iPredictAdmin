import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Button,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/layout/layout';
import NavHeader from '../../../../components/nav/header.component';
import { useUser } from '../../../../utils/context/userContext';
import moment from 'moment';
import MatchUpdate from '../../../../components/teamcard/MatchUpdate';
import TeamCardMatchEmptyComponent from '../../../../components/emptypages/teamcardmatches.empty';
import { useQuery } from 'react-query';
import UserMatchesComponent from '../../../../components/teamcard/UserMatches';
import { nanoid } from 'nanoid';

const qs = require('qs');

async function getDataFromDatabase(router) {
  const query = qs.stringify(
    {
      // sort: ['id:desc'],
      // populate: '*',
      populate: {
        user_card: {
          populate: '*',
        },
        team_card_matches: {
          populate: ['user_card_matches'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards/${router}?${query}`
  );

  let newData = {};
  let newArr = [];

  data.data.attributes?.team_card_matches?.data.forEach((doc) => {
    let date = moment(doc?.attributes?.matchDate).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    newData = {
      id: doc.id,
      date,
      ...doc.attributes,
    };
    newArr.push(newData);
  });

  let sortedArr = newArr.sort((a, b) => {
    return b.id - a.id;
  });
  return sortedArr;
}

const ViewCardMatchComponent = ({ data, card }) => {
  // console.log('data :>> ', data);
  // console.log('card', card);
  const toast = useToast();
  const router = useRouter();
  const { userDoc } = useUser();
  // const [done, setDone] = useState(null);
  // console.log(router);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  const { data: freshData } = useQuery(
    ['card-matches', router?.query?.id],
    async () => await getDataFromDatabase(router?.query?.name),
    { initialData: data }
  );

  // console.log('freshData :>> ', freshData);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const btnRef = React.useRef();
  let [result, setResult] = useState({
    id: '',
    result: '',
  });

  console.log('result :>> ', result);
  const [usersMatches, setUsersMatches] = useState({});

  const handleusersMatches = (card) => {
    drawerOnOpen();
    setUsersMatches(card);
  };

  const currentResult = (card) => {
    setResult(card);
    // console.log(result);

    onOpen();
  };

  const confirmResult = async () => {
    const query = qs.stringify(
      {
        sort: ['id:desc'],

        populate: {
          team_card: {
            populate: ['*'],
          },
          user_card_matches: {
            populate: 'user_card',
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    // ************************************************************
    // update latest in team-card-match to false and also update the result
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-card-matches/${result?.id}?${query}`,
      {
        data: {
          latest: false,
          result: result.result,
        },
      }
    );

    console.log('confirm team card data: ', data);

    // ************************************************************
    // set user matches result and get all the user cards that played this match
    data?.data?.attributes?.user_card_matches?.data.forEach(
      async (userMatch) => {
        // console.log('userMatch :>> ', userMatch);
        // ************************************************************
        //  get each user card matches and check if it has been calculated

        const { data: checkMatch } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-card-matches/${userMatch?.id}?populate=*`
        );
        // * ######################################################### *

        if (!checkMatch?.data?.attributes?.calculated) {
          // ************************************************************
          // update each user match result and calculated field to true
          const { data: currentCardMatch } = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-card-matches/${userMatch?.id}`,
            {
              data: {
                result: result.result,
                calculated: true,
              },
            }
          );
          // * ######################################################### *
          // console.log('current user card match :>> ', currentCardMatch);
          // ************************************************************
          // get each user card and calculate the new currentValue and reward if they won
          // if (userMatch?.attributes?.user_card?.data?.id) {
          const id = userMatch?.attributes?.user_card?.data?.id;
          // console.log(id);
          const { data: userCard } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards/${id}`
          );
          // console.log('user card => ', userCard);
          if (result?.result == currentCardMatch?.data?.attributes?.advantage) {
            const newCurrentValue =
              userCard?.data?.attributes?.currentValue -
              userCard?.data?.attributes?.loss;

            await axios.put(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards/${id}`,
              {
                data: {
                  currentValue: newCurrentValue,
                },
              }
            );
          } else if (
            result?.result !== currentCardMatch?.data?.attributes?.advantage &&
            result?.result !== 'draw'
          ) {
            // const newCurrentValue =
            //   +userCard?.data?.attributes?.currentValue +
            //   +userCard?.data?.attributes?.winCoins;
            const newReward =
              userCard?.data?.attributes?.reward +
              userCard?.data?.attributes?.winCash;
            await axios.put(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards/${id}`,
              {
                data: {
                  // currentValue: +newCurrentValue,
                  reward: newReward,
                },
              }
            );
            const newid = nanoid();
            const historyData = {
              coins: 0,
              money: +userCard?.data?.attributes?.winCoins,
              activity: userCard?.data?.attributes?.name,
              type: 'User Match Reward',
            };

            await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/histories`,
              {
                data: {
                  historyId: newid,
                  email: userDoc?.email,
                  fullName: `${userDoc?.firstName} ${userDoc?.lastName}`,
                  coins: historyData?.coins,
                  money: historyData?.money,
                  activity: historyData?.activity,
                  type: historyData?.type,
                },
              }
            );
          }
          // const { data: updatedUserCard } = await axios.get(
          //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-cards/${id}`
          // );

          // console.log('updatedUserCard :>> ', updatedUserCard);
          // }
        }
      }
    );

    // ************************************************************
    // show a toast that everything is done
    toast({
      title: 'Update Complete',
      description: 'All users matches has been updated successfully',
      status: 'success',
      duration: 5000,
      position: 'top-right',
      isClosable: true,
    });

    // setDone(true);
    // if (done) {
    router.back();
    // }
  };
  return (
    <Layout
      name='Team Card Matches'
      desc='I-Predict Particular season card matches'
    >
      <NavHeader />
      <div className='mx-4 pb-6'>
        <div className='text my-5 text-center'>
          <div className='my-2 mx-auto flex max-w-xl justify-between'>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push(`/teamcard/view/${card?.season}`)}
              className='mx-4 sm:mx-0'
            >
              Back
            </Button>
          </div>
          <Heading>{card?.name} Matches</Heading>
        </div>

        <div className='flex flex-wrap justify-center gap-3'>
          {freshData?.length !== 0 ? (
            freshData?.map((card) => (
              <div
                key={card?.id}
                className='relative h-fit w-[19rem] overflow-hidden rounded-md border shadow-md'
              >
                <div className='bg-gray-100 py-2'>
                  <Text className='text-center text-base font-bold '>
                    Opponent is {card?.advantage}
                  </Text>
                </div>
                <div className='flex items-center justify-center space-x-2 p-4'>
                  <div className='relative h-10 w-10'>
                    <Image
                      layout='fill'
                      objectFit='contain'
                      src={card?.opponentLogo}
                      alt={card?.opponentName}
                    />
                  </div>
                  <Text className='break-all text-xl font-bold'>
                    {card?.opponentName}
                  </Text>
                </div>
                <div className='bg-gray-100 py-2  '>
                  <div className='text-center '>
                    <Text className='text-lg font-bold capitalize'>
                      {card?.result}
                    </Text>
                    <Text className='text-xs text-gray-400'>{card?.date}</Text>
                  </div>
                </div>
                <div className='flex justify-center space-x-3 py-2'>
                  <Button
                    onClick={() => handleusersMatches(card)}
                    ref={btnRef}
                    variant='outline'
                    colorScheme='teal'
                  >
                    User&apos;s Matches
                  </Button>
                  <Button
                    onClick={() => currentResult(card)}
                    isDisabled={card?.result !== 'not played'}
                    variant='outline'
                    colorScheme='blue'
                  >
                    Update Match
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <TeamCardMatchEmptyComponent />
          )}
        </div>
        <MatchUpdate
          isOpen={isOpen}
          onClose={onClose}
          result={result}
          setResult={setResult}
          confirmResult={confirmResult}
        />
        <UserMatchesComponent
          isOpen={drawerIsOpen}
          onClose={drawerOnClose}
          // btnRef={btnRef}
          card={usersMatches}
        />
      </div>
    </Layout>
  );
};

export default ViewCardMatchComponent;

export async function getServerSideProps({ params }) {
  const query = qs.stringify(
    {
      // sort: ['id:desc'],
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards/${params.name}?${query}`
  );

  let newData = {};
  let newArr = [];

  data.data.attributes?.team_card_matches?.data.forEach((doc) => {
    let date = moment(doc?.attributes?.matchDate).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    newData = {
      id: doc.id,
      date,
      ...doc.attributes,
    };
    newArr.push(newData);
  });

  let sortedArr = newArr.sort((a, b) => {
    return b.id - a.id;
  });

  // getDataFromDatabase();

  return {
    props: {
      // data: newArr,
      data: sortedArr,
      card: data?.data?.attributes,
    },
  };
}
