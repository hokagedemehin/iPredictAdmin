import { useDisclosure } from "@chakra-ui/react";
import MaterialTable from "material-table";
import moment from "moment";
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import GetAllHistories from "../../utils/wallet/getAllHistories";
import HistoryDescription from "./history.details.component";

const AllHistories = () => {
  // const router = useRouter();
  const [allData, setAllData] = useState([]);
  const [rowInfo, setRowInfo] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (e, data) => {
    onOpen();

    e.preventDefault();
    setRowInfo(data);
    // router.push(`/triviaattempts/${data.email}/${data.attemptID}`);
  };

  const { data, isSuccess, dataUpdatedAt } = useQuery(
    "triviaattempts",
    async () => await GetAllHistories()
  );

  useEffect(() => {
    if (
      isSuccess &&
      typeof (data !== null) &&
      Object?.keys(data).length !== 0
    ) {
      let newArr = [];

      data.forEach((doc) => {
        const firestoreData = doc.data();
        firestoreData["date"] = moment(doc.data().createdAt.toDate()).format(
          "MMM Do YY"
        );

        return newArr.push(firestoreData);
      });

      setAllData(newArr);
    }
  }, [isSuccess, dataUpdatedAt]);

  return (
    <div className="mx-auto mb-10 w-full ">
      <MaterialTable
        title="Transactions"
        columns={[
          { title: "transact id", field: "attemptID", hidden: true },
          { title: "Date", field: "date" },
          { title: "Full Name", field: "fullName" },
          { title: "Email", field: "email" },
          { title: "Activity", field: "type" },
          {
            title: "Coins",
            field: "coins",
            type: "numeric",
          },
          {
            title: "Money",
            field: "money",
            type: "numeric",
          },

          // {
          //   title: 'Winner',
          //   field: 'winner',
          //   // type: 'boolean',
          //   lookup: { yes: 'Yes', no: 'No' },
          // },
        ]}
        data={allData}
        onRowClick={(evt, data) => handleClick(evt, data)}
        options={{
          sorting: true,
          // filtering: true,
          headerStyle: {
            backgroundColor: "#591d87",
            color: "#FFF",
            zIndex: 0,
            textAlign: "center",
          },
        }}
      />
      <HistoryDescription isOpen={isOpen} onClose={onClose} rowInfo={rowInfo} />
    </div>
  );
};

export default AllHistories;
