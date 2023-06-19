import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "./context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserBadgeItem from "./UserBadgeItem";

function GroupChatModal({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectUsers, setSelectUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handlerSearch = async (query: any) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(
        `https://chatback-api.onrender.com?search=${search}`,
        config
      );
      setLoading(false);
      setSearchRes(data);
    } catch (err) {
      toast({
        title: "لا يوجد مستخدم بهذا الاسم",
        status: "error",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  console.log(searchRes);
  const handleSubmit = async () => {
    if (!groupChatName || !selectUsers) {
      toast({
        title: "ضيف مستخدمين او حدد اسم المجموعة",
        status: "error",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.post(
        "https://chatback-api.onrender.com/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectUsers.map((user) => user._id)),
        },
        config
      );
      setChats([data, ...chats]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = (delUser: any) => {
    setSelectUsers(selectUsers.filter((user) => user._id !== delUser));
  };
  const handleGroup = (userToAdd: any) => {
    if (selectUsers.includes(userToAdd)) {
      toast({
        title: "هذا المستخدم موجود",
        status: "error",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSelectUsers([...selectUsers, userToAdd]);
  };
  //   console.log(groupChatName);
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <FormControl>
                <Input
                  type="text"
                  placeholder="أسم المحادثة"
                  mb={3}
                  onChange={(e: any) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  placeholder="اسم المستخدم"
                  mb={1}
                  onChange={(e: any) => handlerSearch(e.target.value)}
                />
              </FormControl>
            </VStack>
            <HStack flexWrap={"wrap"} w={"full"}>
              {selectUsers.map((user) => {
                return (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFun={() => handleDelete(user._id)}
                  />
                );
              })}
            </HStack>
            {loading ? (
              <Text textAlign={"center"}>Loading...</Text>
            ) : search.length === 0 ? (
              ""
            ) : (
              searchRes.map((user: any) => {
                return (
                  <Box
                    // display={!user ? "block" : "hidden"}
                    display={"flex"}
                    alignItems={"center"}
                    borderRadius={"2xl"}
                    key={user._id}
                    // borderColor={"gray"}
                    onClick={() => {
                      handleGroup(user);
                    }}
                    cursor={"pointer"}
                    px={3}
                    py={2}
                    mb={2}
                    w={user.username === "" ? "0px" : "full"}
                    fontWeight={"bold"}
                    backgroundColor={"currentcolor"}
                    _hover={{
                      backgroundColor: "blackAlpha.800",
                    }}
                  >
                    <Avatar
                      mr={2}
                      size={"sm"}
                      name={user.username}
                      src={user.pic.url}
                    />
                    <Box>
                      <Text color={"white"}>{user.username}</Text>
                      <Text fontSize={"xs"} color={"white"}>
                        Email: {user.email}
                      </Text>
                    </Box>
                  </Box>
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              انشاء
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
