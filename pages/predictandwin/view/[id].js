import axios from 'axios';
import React from 'react';
import Layout from '../../../components/layout/layout';
import NavHeader from '../../../components/nav/header.component';
import ViewSelectedMatches from '../../../components/predictandwin/viewmatches.component';

const ViewMatches = ({ data }) => {
  // console.log(data);

  return (
    <Layout>
      <NavHeader />
      <ViewSelectedMatches data={data} />
    </Layout>
  );
};

export default ViewMatches;

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/selected-matches/${params.id}?populate=*`
  );
  return {
    props: {
      data: data?.data,
    },
    // revalidate: 5,
  };
}
