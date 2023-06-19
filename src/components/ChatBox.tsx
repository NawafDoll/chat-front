import React from "react";
import { ChatState } from "./context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

function ChatBox({ fetchAgain, setFetchAgain }: any) {
  const { selectChat } = ChatState();
  return (
    <Box
      bg={"white"}
      w={"100%"}
      color={"white"}
      display={{ base: selectChat ? "flex" : "none", md: "flex" }}
      alignItems={"center"}
      flexDir={"column"}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default ChatBox;
