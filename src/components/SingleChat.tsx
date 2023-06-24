import React, { useEffect, useState } from "react";
import { ChatState } from "./context/ChatProvider";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "./ChatLogics";
import ProfileUser from "./context/ProfileUser";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import "./app.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";

const ENDPOINT = `https://chatback-api.onrender.com`;
let socket: any, selectChatCompare: any;

function SingleChat({ fetchAgain, setFetchAgain }: any) {
  const { user, selectChat, setSelectChat } = ChatState();
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [image, setImage] = useState<any>();
  const { getRootProps, getInputProps, isDragActive } = useDropzone();
  const fetchMessages = async () => {
    if (!selectChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(
        `https://chatback-api.onrender.com/message/${selectChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectChat._id);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    fetchMessages();

    selectChatCompare = selectChat;
  }, [selectChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (
        !selectChatCompare ||
        selectChatCompare._id !== newMessageRecieved.chat._id
      ) {
        setFetchAgain(!fetchAgain);
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const sendMessage = async (e: any) => {
    // if (e.key === "Enter" && newMessage) {
    if (image === "" || newMessage === "") return;
    if (newMessage === "") return;
    socket.emit("stop typing", selectChat._id);
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.post(
        `https://chatback-api.onrender.com/message`,
        {
          content: newMessage,
          chatId: selectChat._id,
        },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {}
  };

  const inputFileRef: any = React.useRef();
  const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files);
  };
  const onBtnClick = (e: any) => {
    e.preventDefault();
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };

  const inputRef: any = React.useRef();
  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   /*Collecting node-element and performing click*/

  // };
  const selectFile = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    // if('.mp4'||'.mp3'||)
    try {
      const config: any = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          // "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `https://chatback-api.onrender.com/message/sendfile`,
        { image: image, chatId: selectChat._id, content: "" },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
      setImage(null);
      setNewMessage("");
      setFetchAgain(fetchAgain);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handlerPic = (e: any) => {
    const file = e.target.files[0];
    setNewMessage(file.name);
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectChat ? (
        <>
          <Text
            color={"black"}
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            display={"flex"}
            justifyContent={{ base: "space-between", md: "right" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectChat("")}
              aria-label={""}
            />
            {!selectChat.isGroupChat ? (
              <Box>
                {getSender(user, selectChat.users)}
                <Avatar
                  ml={2}
                  mt={1}
                  name={getSender(user, selectChat.users)}
                  size={"sm"}
                  src={`${getSenderFull(user, selectChat.users[0].pic.url)}`}
                />
              </Box>
            ) : (
              <>
                {selectChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
            color={"black"}
          >
            {loading ? (
              <Spinner
                size={"lg"}
                w={20}
                h={20}
                alignSelf={"center"}
                m={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <HStack
              justify={"center"}
              justifyContent={"center"}
              justifyItems={"center"}
              justifySelf={"center"}
            >
              <FormControl isRequired mt={3}>
                {isTyping ? <div>Loading...</div> : <></>}
                <Input
                  variant={"filled"}
                  bg={"#E0E0E0"}
                  placeholder="Enter a message..."
                  onChange={typingHandler}
                  value={newMessage}
                />
              </FormControl>
              <Input
                display={"none"}
                type="file"
                name="image"
                // value={userData.email}
                bg={!image ? "" : "blue"}
                ref={inputFileRef}
                onChange={handlerPic}
              />
              <Button
                mt={"7px"}
                border={"1px"}
                borderRadius={"full"}
                onClick={onBtnClick}
                ref={inputRef}
                loadingText="Submitting"
                size="sm"
                color={"blue.400"}
              >
                <AddIcon />
              </Button>

              <Button
                mt={"7px"}
                isLoading={loading}
                onClick={
                  !image || image === null || image === undefined
                    ? sendMessage
                    : selectFile
                }
                // type="submit"
                loadingText="Submitting"
                size="sm"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {/* <i class="fa-regular fa-paper-plane"></i> */}
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </Button>
            </HStack>
            {/* <form onSubmit={selectFile} encType="multipart/form-data"> */}

            {/* </form> */}
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} color={"black"}>
            انقر على احد الاصدقاء لتبدأ المحادثة
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
