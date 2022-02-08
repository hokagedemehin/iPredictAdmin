import MaterialTable from 'material-table';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GetAllTriviaAttempts from '../../../utils/trivia/attempts/getAllAttempts';

const TriviaAttemptsPageComponent = () => {
  // const [rowInfo, setRowInfo] = useState([]);
  const router = useRouter();
  const [allData, setAllData] = useState([]);
  const handleClick = (e, data) => {
    e.preventDefault();
    router.push(`/triviaattempts/${data.email}/${data.attemptID}`);
  };

  // console.log('allData', allData);

  // const aa = allData[0].createdAt.toDate();
  // const bb = moment(aa).format('MMMM Do YYYY, h:mm:ss a');
  // console.log('aa :>> ', bb);

  const { data, isSuccess, dataUpdatedAt } = useQuery(
    'triviaattempts',
    async () => await GetAllTriviaAttempts()
  );

  useEffect(() => {
    if (isSuccess) {
      let newArr = [];

      data.forEach((doc) => {
        const firestoreData = doc.data();
        firestoreData['date'] = moment(doc.data().createdAt.toDate()).format(
          'MMM Do YY'
        );

        return newArr.push(firestoreData);
      });

      setAllData(newArr);
    }
  }, [isSuccess, dataUpdatedAt]);

  // console.log('data', data);

  // const data1 = [
  //   {
  //     name: 'Mehmet',
  //     surname: 'Baran',
  //     birthYear: 1987,
  //     birthCity: 63,
  //   },
  //   {
  //     name: 'Zerya Betül',
  //     surname: 'Baran',
  //     birthYear: 2017,
  //     birthCity: 34,
  //   },
  //   {
  //     name: 'Mehmet',
  //     surname: 'Baran',
  //     birthYear: 1987,
  //     birthCity: 63,
  //   },
  //   {
  //     name: 'Zerya Betül',
  //     surname: 'Baran',
  //     birthYear: 2017,
  //     birthCity: 34,
  //   },
  //   {
  //     name: 'Mehmet',
  //     surname: 'Baran',
  //     birthYear: 1987,
  //     birthCity: 63,
  //   },
  //   {
  //     name: 'Zerya Betül',
  //     surname: 'Baran',
  //     birthYear: 2017,
  //     birthCity: 34,
  //   },
  //   {
  //     name: 'Mehmet',
  //     surname: 'Baran',
  //     birthYear: 1987,
  //     birthCity: 63,
  //   },
  //   {
  //     name: 'Zerya Betül',
  //     surname: 'Baran',
  //     birthYear: 2017,
  //     birthCity: 34,
  //   },
  // ];

  return (
    <div className='flex'>
      <div className='mb-10 mx-auto w-full '>
        <MaterialTable
          title='Trivia Attempts'
          columns={[
            { title: 'Attempt Id', field: 'attemptID', hidden: true },
            { title: 'Date', field: 'date' },
            { title: 'Full Name', field: 'fullName' },
            { title: 'Email', field: 'email' },
            {
              title: 'Type',
              field: 'type',
              lookup: {
                easyway: 'Easyway',
                confam: 'Confam',
                originality: 'Originality',
                excellent: 'Excellent',
                chairman: 'Chairman',
                presido: 'Presido',
              },
            },
            {
              title: 'Correct Answers',
              field: 'correctAnswers',
              type: 'numeric',
            },
            { title: 'Wrong Answers', field: 'wrongAnswers', type: 'numeric' },
            {
              title: 'Winner',
              field: 'winner',
              // type: 'boolean',
              lookup: { yes: 'Yes', no: 'No' },
            },
          ]}
          data={allData}
          // actions={[
          //   {
          //     icon: 'save',
          //     tooltip: 'Save User',
          //     onClick: (event, rowData) => alert('You saved ' + rowData.name),
          //   },
          // ]}
          onRowClick={(evt, data) => handleClick(evt, data)}
          options={{
            sorting: true,
            // filtering: true,
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF',
              zIndex: 0,
              textAlign: 'center',
            },
            // rowStyle: {
            //   textAlign: 'center',

            // },
          }}
        />
      </div>
    </div>
  );
};

export default TriviaAttemptsPageComponent;
