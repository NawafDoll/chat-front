import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { ChatState } from "./context/ChatProvider";
interface dataUsers {
  _id: string;
  username: string;
  email: string;
  pic: string;
}
export function Slide(props: any) {
  const [search, setSearch] = useState<string>("");
  const [searchRes, setSearchRes] = useState<dataUsers[]>([
    { _id: "", username: "", email: "", pic: "" },
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setSelectChat, chats, setChats } = ChatState();
  const { onClose } = useDisclosure();

  const handlerSearch = async () => {
    if (!search) {
      toast({
        title: "الرجاء أدخل اسم المستخدم",
        status: "warning",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
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
        `https://chatback-api.onrender.com/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchRes(data);
      console.log(data);
      onClose();
    } catch (err) {
      console.log(err);
      setLoading(false);
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
  const accessChat = async (userId: any) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.post(
        `https://chatback-api.onrender.com/chat`,
        { userId },
        config
      );
      if (!chats.find((e: any) => e._id === data._id))
        setChats([data, ...chats]);
      setLoading(false);
      setSelectChat(data);

      onClose();
    } catch (err) {
      onClose();
      setLoading(false);
      toast({
        title: "هذا المستخدم موجود في المحادثة",
        status: "error",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  // console.log(chats);
  return (
    <Box>
      <Drawer
        isOpen={props.isOpen}
        placement="left"
        onClose={props.onClose}
        finalFocusRef={props.btnRef}
        // btnRef={props.onclose}
      >
        <DrawerOverlay />
        <DrawerContent bg={"whiteAlpha.900"} h={"91vh"} mt={"61px"}>
          <DrawerCloseButton />
          <DrawerHeader>البحث عن أشخاص</DrawerHeader>

          <DrawerBody>
            <HStack>
              <Input
                border={"2px"}
                borderColor={"gray"}
                placeholder="Type here..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button bg={"blue.600"} color={"white"} onClick={handlerSearch}>
                بحث
              </Button>
            </HStack>
            <Box>
              {loading ? (
                <ChatLoading />
              ) : (
                <Box mt={"5px"} padding={"5px"}>
                  {searchRes.map((user) => {
                    return (
                      <Box
                        // display={!user ? "block" : "hidden"}
                        display={"flex"}
                        alignItems={"center"}
                        borderRadius={"2xl"}
                        key={user._id}
                        // borderColor={"gray"}
                        onClick={() => {
                          accessChat(user._id);
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
                          src={`https://chatback-api.onrender.com/${user.pic}`}
                        />
                        <Box>
                          <Text color={"white"}>{user.username}</Text>
                          <Text fontSize={"xs"} color={"white"}>
                            Email: {user.email}
                          </Text>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
