import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";

const HistoryDescription = ({ isOpen, onClose, rowInfo }) => {
  console.log("rowInfo", rowInfo);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {rowInfo?.fullName} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Lorem count={2} /> */}

          {rowInfo.type == "Buy Coins" && (
            <Text className=" font-semibold">
              User bought {rowInfo?.coins} coins on{" "}
              {moment(rowInfo?.createdAt.toDate()).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          )}
          {rowInfo.type == "Claim Free Coins" && (
            <Text className=" font-semibold">
              User claimed their free {rowInfo?.coins} coins on{" "}
              {moment(rowInfo?.createdAt.toDate()).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          )}
          {rowInfo.type == "Match Prediction" && (
            <Text className=" font-semibold">
              User spent {rowInfo?.coins} coins to predict matches on{" "}
              {moment(rowInfo?.createdAt.toDate()).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          )}
          {rowInfo.type == "Start Trivia Quiz" && (
            <Text className=" font-semibold">
              User spent {rowInfo?.coins} coins to play a trivia game on{" "}
              {moment(rowInfo?.createdAt.toDate()).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          )}
          {rowInfo.type == "Trivia Game Reward" && (
            <Text className=" font-semibold">
              User won &#8358;{rowInfo?.money} from a trivia game they played on{" "}
              {moment(rowInfo?.createdAt.toDate()).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HistoryDescription;
