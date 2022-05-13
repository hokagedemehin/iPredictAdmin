import { Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
const qs = require('qs');
import { BiArrowBack } from 'react-icons/bi';
import moment from 'moment';

const ViewMatches = ({ data: selectedMacthes }) => {
  // console.log('data :>> ', selectedMacthes);
  const router = useRouter();

  const handleClick = (e, data) => {
    e.preventDefault();
    // onOpen();
    // setRowInfo(data);
    router.push(`/predictandwin/view/${data.id}`);
    // console.log('data', data);
  };

  return (
    <Layout>
      <NavHeader />
      <div className='mx-2 flex flex-col'>
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
          View Matches
        </Text>
        <div className='mx-auto mb-10 w-fit '>
          <MaterialTable
            title='All Selected Matches'
            columns={[
              { title: 'Id', field: 'id', hidden: true },
              { title: 'Name', field: 'name' },
              { title: 'Date', field: 'newdate' },

              { title: 'No of Matches', field: 'noOfMatches', type: 'numeric' },
              {
                title: 'Latest',
                field: 'latest',
                // type: 'boolean',
                lookup: { true: true, false: false },
              },
            ]}
            data={selectedMacthes}
            onRowClick={(evt, data) => handleClick(evt, data)}
            options={{
              sorting: true,
              // filtering: true,
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF',
                zIndex: 0,
                // textAlign: 'center',
              },
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ViewMatches;

export async function getStaticProps() {
  const query = qs.stringify(
    {
      sort: ['date:desc'],
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches?${query}`
  );

  let newData = {};
  let newArr = [];

  data.data.forEach((doc) => {
    let date = moment(doc?.attributes?.createdAt).format('MMM Do YY');
    newData = {
      id: doc.id,
      newdate: date,
      ...doc.attributes,
    };
    newArr.push(newData);
  });

  return {
    props: {
      data: newArr,
    },
    revalidate: 5,
  };
}
