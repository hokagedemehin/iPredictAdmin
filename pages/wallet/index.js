import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import NoWalletEmptyComponent from '../../components/emptypages/nowallet.empty';
import Layout from "../../components/layout/layout";
import NavHeader from "../../components/nav/header.component";
import WalletHomePage from "../../components/wallet/wallethome.component";
import { useUser } from "../../utils/context/userContext";
// import NavHeader from "../../components/nav/header.component original";

const UserWalletPage = () => {
  const router = useRouter();
  const { user, userDoc } = useUser();
  // console.log(user);
  useEffect(() => {
    if (!userDoc || userDoc.role !== "admin") {
      router.push("/login");
    }
  }, [userDoc]);

  return (
    <Layout name="wallet" desc="I-Predict User Wallet">
      <NavHeader />
      <div className="mx-2">
        <div className="text my-5 text-center">
          <Heading>Transactions</Heading>
        </div>
        <WalletHomePage userDoc={userDoc} user={user} />
      </div>
    </Layout>
  );
};

export default UserWalletPage;
