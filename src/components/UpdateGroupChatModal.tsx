import { ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "./context/ChatProvider";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import ChatLoading from "./ChatLoading";

function UpdateGroupChatModal({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}: any) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupeChatName, setGroupeChatName] = useState("");
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState([]);
  const [renameLoading, setRenameLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectChat, setSelectChat, user } = ChatState();

  const handleAddUserToGroup = async (user1: any) => {
    if (selectChat.users.find((u: any) => u._id === user1)) {
      toast({
        title: "ُهذا المستخدم موجود في المجموعة",
        status: "error",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // if (selectChat.groupAdmin._id !== user.id) {
    //   toast({
    //     title: "ُمدير القروب فقط يستطيع الاضافة",
    //     status: "error",
    //     position: "bottom-left",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.put(
        `https://chat-api-9h8t.onrender.com/chat/groupadd`,
        {
          chatId: selectChat._id,
          userId: user1,
        },
        config
      );
      setSelectChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {}
  };

  const handleRemove = async (user1: any) => {
    // if (selectChat.groupAdmin._id !== user.id && user1._id !== user.id) {
    //   toast({
    //     title: "ُمدير القروب فقط يستطيع الاضافة",
    //     status: "error",
    //     position: "bottom-left",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.put(
        `https://chat-api-9h8t.onrender.com/chat/groupremove`,
        {
          chatId: selectChat._id,
          userId: user1,
        },
        config
      );
      user1 === user.id ? setSelectChat() : setSelectChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(
        `https://chat-api-9h8t.onrender.com/user?search=${search}`,
        config
      );
      setRenameLoading(false);
      setSearchResult(data);
    } catch (err) {
      console.log(err);
      setRenameLoading(false);
      toast({
        title: "لا يوجد مستخدم بهذا الاسم",
        status: "error",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRename = async () => {
    if (!groupeChatName) {
      toast({
        title: "ُفضلا اكتب اسم المجموعة",
        status: "error",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
      //
      return;
    }
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.put(
        `https://chat-api-9h8t.onrender.com/chat/grouprename`,
        { chatId: selectChat._id, chatName: groupeChatName },
        config
      );
      setSelectChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      //   console.log("sss" + selectChat);
    } catch (err) {
      setRenameLoading(false);
    }
    setGroupeChatName("");
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
        aria-label={""}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            display={"flex"}
            justifyContent={"center"}
          >
            {selectChat.chatName.toUpperCase()}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {selectChat.users
                .filter((e: any) => e._id !== user.id)
                .map((us: any) => {
                  return (
                    <UserBadgeItem
                      key={us._id}
                      user={us}
                      handleFun={() => handleRemove(us._id)}
                    />
                  );
                })}
              <FormControl display={"flex"} flexDir={"row"}>
                <Input
                  placeholder="اسم المجموعة"
                  mb={3}
                  value={groupeChatName}
                  onChange={(e) => setGroupeChatName(e.target.value)}
                />
                <Button
                  colorScheme="teal"
                  ml={1}
                  isLoading={renameLoading}
                  onClick={handleRename}
                >
                  تحديث
                </Button>
              </FormControl>
              <FormControl>
                <Input
                  placeholder="أضافة مستخدم جديد"
                  mb={3}
                  //   value={}
                  onChange={(e: any) => handleSearch(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              {renameLoading ? (
                <Spinner />
              ) : (
                <Box mt={"5px"} padding={"5px"}>
                  {searchResult.map((us: any) => {
                    return (
                      <Box
                        // display={!user ? "block" : "hidden"}
                        display={"flex"}
                        alignItems={"center"}
                        borderRadius={"2xl"}
                        key={us._id}
                        // borderColor={"gray"}
                        onClick={() => {
                          handleAddUserToGroup(us._id);
                        }}
                        cursor={"pointer"}
                        px={3}
                        py={2}
                        mb={2}
                        w={us.username === "" ? "0px" : "full"}
                        fontWeight={"bold"}
                        backgroundColor={"currentcolor"}
                        _hover={{
                          backgroundColor: "blackAlpha.800",
                        }}
                      >
                        <Avatar
                          mr={2}
                          size={"sm"}
                          name={us.username}
                          src={`https://chat-api-9h8t.onrender.com/${us.pic}`}
                        />
                        <Box>
                          <Text color={"white"}>{us.username}</Text>
                          <Text fontSize={"xs"} color={"white"}>
                            Email: {us.email}
                          </Text>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleRemove(user.id)}
            >
              الخروج من المجموعة
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal;
