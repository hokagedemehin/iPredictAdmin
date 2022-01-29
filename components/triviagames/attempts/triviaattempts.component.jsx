import MaterialTable from 'material-table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GetAllTriviaAttempts from '../../../utils/trivia/attempts/getAllAttempts';

const TriviaAttemptsPageComponent = () => {
  // const [rowInfo, setRowInfo] = useState([]);
  const [allData, setAllData] = useState([]);
  const handleClick = (e, data) => {
    e.preventDefault();
    console.log('data :>> ', data);
  };

  // console.log('allData', allData);

  // const aa = allData[0].createdAt.toDate();
  // const bb = moment(aa).format('MMMM Do YYYY, h:mm:ss a');
  // console.log('aa :>> ', bb);

  const { data, isSuccess } = useQuery(
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
        // const bb = [...aa];
        // console.log('bb', aa);
        return newArr.push(firestoreData);
      });

      setAllData(newArr);
      // }
    }
  }, [isSuccess]);

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
            { title: 'Attempt Id', field: 'attemptID' },
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
