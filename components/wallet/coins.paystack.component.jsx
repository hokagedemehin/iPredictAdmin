import { Image, Text } from "@chakra-ui/react";
import React from "react";
import { usePaystackPayment } from "react-paystack";
import UpdateUserWallet from "../../utils/wallet/updateUserWallet";
// import { useRouter } from 'next/router';

const CoinsComponentPayStack = ({ data, userDoc, user }) => {
  // const router = useRouter();
  // console.log(process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY);
  const config = {
    reference: new Date().getTime().toString(),
    email: userDoc?.email,
    amount: data.amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  // you can call this function anything
  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.table("refrence", reference);
    if (reference.status === "success") {
      await UpdateUserWallet(data.coins, user);
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log('closed');
  };
  const initializePayment = usePaystackPayment(config);
  // const handleFlutterPayment = useFlutterwave(config);

  const handleClick = (e) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
    // handleFlutterPayment({
    //   callback: async (response) => {
    //     if (response.status === 'successful') {
    //       await UpdateUserWallet(data.coins, user);
    //       closePaymentModal;
    //     }
    //   },
    //   onClose: () => {
    //     // router.push('/wallet');
    //   },
    // });
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

export default CoinsComponentPayStack;
