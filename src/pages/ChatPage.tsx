import React, { useState, useCallback, useEffect } from "react";
import { ChatState } from "../components/context/ChatProvider";
import { Slide } from "../components/Slide";
import { Box, background, useToast } from "@chakra-ui/react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import axios from "axios";

function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div style={{ width: "100%", background: "currentColor" }}>
      {user && <Slide />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"full"}
        h={"91.5vh"}
        p={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} />}
      </Box>
    </div>
  );
}

export default ChatPage;
