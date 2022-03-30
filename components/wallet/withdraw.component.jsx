import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import GetWithdrawals from '../../utils/wallet/getWithdrawals';
import moment from 'moment';
import MaterialTable from 'material-table';
import WithdrawalDescription from './withdraw.description';
import { useQuery } from 'react-query';

const WithdrawComponent = () => {
  const [allData, setAllData] = useState([]);
  const [rowInfo, setRowInfo] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log('allData :>> ', allData);
  const handleClick = (e, data) => {
    onOpen();

    e.preventDefault();
    setRowInfo(data);
    // router.push(`/triviaattempts/${data.email}/${data.attemptID}`);
  };

  const { data, isSuccess, dataUpdatedAt } = useQuery(
    'withdraws',
    async () => await GetWithdrawals()
  );

  useEffect(() => {
    if (
      isSuccess &&
      typeof (data !== null) &&
      Object?.keys(data).length !== 0
    ) {
      let newArr = [];

      data.forEach((doc) => {
        // console.log(doc.data());
        const firestoreData = doc.data();
        firestoreData['date'] = moment(doc.data().createdAt.toDate()).format(
          'MMM Do YY'
        );

        return newArr.push(firestoreData);
      });

      setAllData(newArr);
    }
  }, [isSuccess, dataUpdatedAt]);

  return (
    <div className='mx-auto mb-10 w-full '>
      <MaterialTable
        title='Withdraw'
        columns={[
          { title: 'withdraw id', field: 'ID', hidden: true },
          { title: 'user id', field: 'userID', hidden: true },
          { title: 'Date', field: 'date' },
          { title: 'Full Name', field: 'fullName' },
          { title: 'Account No', field: 'accountNumber', align: 'center' },
          { title: 'Bank Name', field: 'bankName', align: 'center' },
          // { title: 'Email', field: 'email' },
          // { title: 'Activity', field: 'type' },
          {
            title: 'Amount',
            field: 'amount',
            type: 'numeric',
            align: 'center',
          },
          // {
          //   title: 'Money',
          //   field: 'money',
          //   type: 'numeric',
          // },

          {
            title: 'Transferred',
            field: 'transferred',
            // type: 'boolean',
            align: 'center',
            lookup: { yes: 'yes', no: 'no' },
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
            // display: 'flex',
            // flexDirection: 'row',
            // textAlign: 'center',
            // justifyContent: 'center',
          },
        }}
      />
      <WithdrawalDescription
        isOpen={isOpen}
        onClose={onClose}
        rowInfo={rowInfo}
      />
    </div>
  );
};

export default WithdrawComponent;
