import React, { useCallback, useState, useEffect } from "react";
import { ChatState } from "./context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "./ChatLogics";
import GroupChatModal from "./GroupChatModal";
function MyChats({ fetchAgain }: any) {
  const toast = useToast();
  const [logged, setLogged] = useState<any>();
  const { user, selectChat, setSelectChat, chats, setChats } = ChatState();

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(
        `https://chatback-api.onrender.com/chat`,
        config
      );

      setChats(data);
    } catch (err) {}
  };
  useEffect(() => {
    setLogged(user);
    fetchChat();
  }, [user, fetchAgain]);
  return (
    <Box
      display={{ base: selectChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius={"2xl"}
      border={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text color={"black"}>محادثاتي</Text>
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            أنشاء مجموعة
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat: any) => {
              return (
                <Box
                  onClick={() => setSelectChat(chat)}
                  cursor={"pointer"}
                  bg={selectChat === chat ? "#4299e1" : "#E8E8E8"}
                  color={selectChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(logged, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
