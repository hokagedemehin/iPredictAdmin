import { Button, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import { useRouter } from 'next/router';
import { useUser } from '../../../utils/context/userContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
// import moment from 'moment';
import TeamCardEmptyComponent from '../../../components/emptypages/teamcard.empty';
const qs = require('qs');

const ViewTeamCard = ({ seasons }) => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(seasons);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      // router.back();
      router.push('/login');
      // console.log("no admin");
    }
  }, [userDoc]);

  return (
    <Layout name='View Team Card' desc='I-Predict Add Team Card'>
      <NavHeader />
      <div className=''>
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
          <Heading>View Team Card</Heading>
        </div>
        <div className='mx-2 pb-8 pt-10'>
          <div className='flex flex-wrap items-center justify-center gap-4 pb-8'>
            {seasons &&
              seasons.map((season, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/teamcard/view/${season}`)}
                  className='cursor-pointer rounded-lg border border-teal-100 p-4 shadow-md shadow-teal-200 transition duration-500 ease-in-out hover:border-teal-500 hover:bg-teal-500 hover:text-white hover:shadow-teal-500'
                >
                  <Text className=' text-2xl font-bold'>{`View Season ${season}`}</Text>
                </div>
              ))}
          </div>

          {seasons.length == 0 && <TeamCardEmptyComponent />}
        </div>
      </div>
    </Layout>
  );
};

export default ViewTeamCard;

export async function getStaticProps() {
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team-cards?${query}`
  );

  // let newData = {};
  // let newArr = [];
  let newSet = new Set();

  data.data.forEach((card) => {
    if (!newSet.has(card?.attributes?.season)) {
      newSet.add(card?.attributes?.season);
    }
  });

  // data.data.forEach((doc) => {
  //   let date = moment(doc?.attributes?.createdAt).format('MMM Do YY');
  //   newData = {
  //     id: doc.id,
  //     newdate: date,
  //     ...doc.attributes,
  //   };
  //   newArr.push(newData);
  // });

  return {
    props: {
      // data: newArr,
      seasons: [...newSet],
    },
    revalidate: 5,
  };
}
