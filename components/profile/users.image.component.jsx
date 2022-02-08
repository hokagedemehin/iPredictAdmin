import React from "react";
import moment from "moment";
import { Image, Skeleton } from "@chakra-ui/react";

const UsersImageComponent = ({ userDoc }) => {
  // console.log(userDoc);
  const { firstName, lastName, image, createdAt } = !userDoc ? {} : userDoc;
  const joinedDate = !userDoc
    ? ""
    : // : moment(createdTimestamp.toDate()).calendar();
      moment(createdAt.toDate()).fromNow();
  return (
    <div>
      <div className="mx-auto w-fit rounded-lg border-t-4 border-indigo-400 bg-white p-3 shadow-md">
        <div className="image overflow-hidden rounded-lg">
          <Image
            boxSize="200px"
            objectFit="cover"
            src={image}
            alt={`${firstName} ${lastName}`}
            fallbackSrc="https://via.placeholder.com/250?text=I-Predict"
          />
        </div>
        {!userDoc ? (
          <Skeleton>
            <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">
              {`${firstName} ${lastName}`}
            </h1>
          </Skeleton>
        ) : (
          <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">
            {`${firstName} ${lastName}`}
          </h1>
        )}
        {!userDoc ? (
          <Skeleton>
            <p className="">Joined {joinedDate}</p>
          </Skeleton>
        ) : (
          <h3 className="font-lg text-semibold leading-6 text-gray-600">
            Joined {joinedDate}
          </h3>
        )}
      </div>
    </div>
  );
};

export default UsersImageComponent;
