import { useDisclosure } from '@chakra-ui/react';
import MaterialTable from 'material-table';
import moment from 'moment';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import GetAllUsers from '../../utils/wallet/getAllUsers';
import { Button } from '@chakra-ui/react';
import UsersDescription from './users.description.component';
import GetAllFirestoreUsers from '../../utils/wallet/getAllFirestoreUsers';

const AllUsers = () => {
  // const router = useRouter();
  const [allData, setAllData] = useState([]);
  const [rowInfo, setRowInfo] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadings, setIsLoadings] = useState(false);

  const handleClick = (e, data) => {
    onOpen();

    e.preventDefault();
    setRowInfo(data);
    // router.push(`/triviaattempts/${data.email}/${data.attemptID}`);
  };

  const { data, isSuccess, dataUpdatedAt } = useQuery(
    'users',
    async () => await GetAllUsers()
  );

  useEffect(() => {
    if (isSuccess) {
      let newArr = [];

      data.forEach((doc) => {
        const usersData = doc?.attributes;
        usersData['date'] = moment(doc?.attributes?.createdAt).format(
          'MMM Do YY'
        );

        return newArr.push(usersData);
      });

      setAllData(newArr);
    }
  }, [isSuccess, dataUpdatedAt]);

  const getUsersFromFirestore = async () => {
    await GetAllFirestoreUsers(setIsLoadings);
  };

  return (
    <div className='mx-auto mb-10 w-full space-y-4'>
      <Button
        colorScheme='teal'
        isLoading={isLoadings}
        loadingText='Getting...'
        spinnerPlacement='end'
        variant='solid'
        onClick={() => getUsersFromFirestore()}
        isFullWidth
      >
        Get users from firestore
      </Button>
      <MaterialTable
        title='Users'
        columns={[
          // { title: 'user id', field: 'attemptID', hidden: true },

          { title: 'First Name', field: 'firstName' },
          { title: 'Last Name', field: 'lastName' },

          { title: 'Email', field: 'email' },
          { title: 'Joined', field: 'date' },
          { title: 'Phone No', field: 'phoneNo' },
          {
            title: 'Coins',
            field: 'coins',
            type: 'numeric',
          },
          {
            title: 'Money',
            field: 'money',
            type: 'numeric',
          },
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
      <UsersDescription isOpen={isOpen} onClose={onClose} rowInfo={rowInfo} />
    </div>
  );
};

export default AllUsers;
