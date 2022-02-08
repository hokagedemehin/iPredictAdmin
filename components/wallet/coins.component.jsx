import { Image, Text } from "@chakra-ui/react";
import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import UpdateUserWallet from "../../utils/wallet/updateUserWallet";
// import { useRouter } from 'next/router';

const CoinsComponent = ({ data, userDoc, user }) => {
  // const router = useRouter();
  // console.log(process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY);
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: data.amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userDoc?.email,
      phonenumber: "07030000000",
      name: `${userDoc?.firstName} ${userDoc?.lastName}`,
    },
    customizations: {
      title: "I-Predict Store",
      description: "Payment for items in cart",
      logo: "https://firebasestorage.googleapis.com/v0/b/i-predict-test.appspot.com/o/logo%2Fipredict.png?alt=media&token=72da23fc-edbd-4232-84b0-f4936fd67485",
    },
    // redirect_url: '/wallet',
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleClick = (e) => {
    e.preventDefault();
    handleFlutterPayment({
      callback: async (response) => {
        if (response.status === "successful") {
          await UpdateUserWallet(data.coins, user);
          closePaymentModal;
        }
      },
      onClose: () => {
        // router.push('/wallet');
      },
    });
  };

  return (
    <div>
      <div
        onClick={(e) => {
          handleClick(e);
        }}
        className="flex transform cursor-pointer flex-col items-center justify-center rounded-md bg-purple-800 px-3 py-5 shadow-md shadow-black ring-1 transition duration-200 ease-in hover:scale-105 hover:bg-purple-600 sm:px-5 sm:py-7"
      >
        <Image
          className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
          src="/logo/coins.png"
          alt="user's profile"
          fallbackSrc="https://via.placeholder.com/30?text=user"
        />
        <Text className="font-semibold text-white sm:text-xl">
          {data.coins} Coins
        </Text>
        <div className="rounded-lg bg-white px-6 py-1 font-bold ring-1 sm:text-xl">
          N{data.amount}
        </div>
      </div>
    </div>
  );
};

export default CoinsComponent;
