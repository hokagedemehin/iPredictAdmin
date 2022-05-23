import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import NavHeader from '../../components/nav/header.component';
import { useUser } from '../../utils/context/userContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import MaterialTable from 'material-table';
import axios from 'axios';
import { useQuery } from 'react-query';
import moment from 'moment';
const qs = require('qs');

const ViewCampaignPage = ({ data: campaigns }) => {
  // console.log('campaigns', campaigns)
  const router = useRouter();
  const { userDoc } = useUser();
  const [allData, setAllData] = useState([]);
  const {
    data: allCampaigns,
    isSuccess,
    dataUpdatedAt,
  } = useQuery(
    'campaigns',
    async () => {
      const query = qs.stringify(
        {
          sort: ['id:desc'],
        },
        {
          encodeValuesOnly: true,
        }
      );
      const { data: newCampaign } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaigns?${query}`
      );
      return newCampaign?.data;
    },
    { initialData: campaigns }
  );
  // console.log('allData :>> ', allData);

  useEffect(() => {
    if (isSuccess) {
      let newArr = [];

      allCampaigns.forEach((doc) => {
        const usersData = doc?.attributes;
        usersData['id'] = doc?.id;
        usersData['date'] = moment(doc?.attributes?.createdAt).format(
          'MMM Do YY'
        );

        return newArr.push(usersData);
      });

      setAllData(newArr);
    }
  }, [isSuccess, dataUpdatedAt]);
  useEffect(() => {
    if (!userDoc || userDoc.role !== 'admin') {
      router.push('/login');
    }
  }, [userDoc]);

  return (
    <Layout name='view-campaign' desc='I-predict Campaign View'>
      <NavHeader />
      <div className='mx-2'>
        <div className='text my-5 text-center'>
          <div className='my-2 mx-auto flex max-w-xl'>
            <Button
              variant='link'
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/campaigns')}
              className='mx-4 sm:mx-0'
            >
              Back
            </Button>
          </div>
          <Heading>View Campaigns</Heading>
        </div>
        <div className='mx-auto w-fit'>
          <MaterialTable
            title='Campaign List'
            columns={[
              { title: 'Date', field: 'date' },
              { title: 'Name', field: 'name' },
              { title: 'Link', field: 'link' },
              // { title: 'Image', field: 'image' },
            ]}
            data={allData}
            // onRowClick={(evt, data) => handleClick(evt, data)}
            options={{
              sorting: true,
              // filtering: true,
              headerStyle: {
                backgroundColor: '#591d87',
                color: '#FFF',
                zIndex: 0,
                textAlign: 'center',
              },
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ViewCampaignPage;

export async function getStaticProps() {
  const query = qs.stringify(
    {
      sort: ['id:desc'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaigns?${query}`
  );
  return {
    props: {
      data: data?.data,
    },
  };
}
