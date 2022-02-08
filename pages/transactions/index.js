import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
// import NavHeader from "../../components/nav/header.component original";
import MaterialTable from "material-table";
import { useRouter } from "next/router";
import { useUser } from "../../utils/context/userContext";

const Transactions = () => {
  const router = useRouter();
  const { userDoc } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!userDoc || userDoc.role !== "admin") {
      // router.back();
      router.push("/login");
      // console.log("no admin");
    }
  }, [userDoc]);
  return (
    <Layout name="All-Transactions" desc="I-Predict Transactions">
      <NavHeader />
      <div className="">
        <div className="text my-5 text-center">
          <Heading>Transactions</Heading>
        </div>
        <div>
          <MaterialTable
            title="Transactions"
            columns={[
              { title: "Name", field: "name" },
              { title: "Surname", field: "surname" },
              { title: "Birth Year", field: "birthYear", type: "numeric" },
              {
                title: "Birth Place",
                field: "birthCity",
                lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
              },
            ]}
            data={[
              {
                name: "Mehmet",
                surname: "Baran",
                birthYear: 1987,
                birthCity: 63,
              },
              {
                name: "Zerya Betül",
                surname: "Baran",
                birthYear: 2017,
                birthCity: 34,
              },
              {
                name: "Mehmet",
                surname: "Baran",
                birthYear: 1987,
                birthCity: 63,
              },
              {
                name: "Zerya Betül",
                surname: "Baran",
                birthYear: 2017,
                birthCity: 34,
              },
              {
                name: "Mehmet",
                surname: "Baran",
                birthYear: 1987,
                birthCity: 63,
              },
              {
                name: "Zerya Betül",
                surname: "Baran",
                birthYear: 2017,
                birthCity: 34,
              },
              {
                name: "Mehmet",
                surname: "Baran",
                birthYear: 1987,
                birthCity: 63,
              },
              {
                name: "Zerya Betül",
                surname: "Baran",
                birthYear: 2017,
                birthCity: 34,
              },
            ]}
            actions={[
              {
                icon: "save",
                tooltip: "Save User",
                onClick: (event, rowData) => alert("You saved " + rowData.name),
              },
            ]}
            options={{
              sorting: true,
              filtering: true,
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
                zIndex: 0,
              },
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
