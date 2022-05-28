import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
const qs = require('qs');
import moment from 'moment';
import { useRouter } from 'next/router';

const ViewMagazineComp = ({ data: allMags }) => {
  const router = useRouter();
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazines?${query}`
      );
      return newCampaign?.data;
    },
    { initialData: allMags }
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

  const handleClick = (e, data) => {
    e.preventDefault();
    router.push(`/magazine/view/${data.id}`);
  };
  return (
    <div>
      <div className='mx-auto w-fit'>
        <MaterialTable
          title='Magazine List'
          columns={[
            { title: 'Date', field: 'date' },
            { title: 'Name', field: 'name' },
            { title: 'Pages', field: 'pages' },
            // { title: 'Image', field: 'image' },
          ]}
          data={allData}
          onRowClick={(evt, data) => handleClick(evt, data)}
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
  );
};

export default ViewMagazineComp;
