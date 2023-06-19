import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./ChatLogics";
import { ChatState } from "./context/ChatProvider";
import { Avatar, Image, Text, Tooltip } from "@chakra-ui/react";

function ScrollableChat({ messages }: any) {
  const { user } = ChatState();
  // console.log(messages);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m: any, i: any) => {
          console.log("senderPis:  " + m.image);
          return (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user.id) ||
                isLastMessage(messages, i, user.id)) && (
                <Tooltip
                  label={m.sender.username}
                  placement="bottom-start"
                  hasArrow
                  //   children={undefined}
                >
                  <Avatar
                    mt={"7px"}
                    mr={1}
                    size={"sm"}
                    cursor={"pointer"}
                    name={m.sender.username}
                    src={`https://chatback-api.onrender.com/${m.sender.pic}`}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user.id),
                  marginTop: isSameUser(messages, m, i) ? 3 : 10,
                }}
              >
                {m.image !== undefined ? (
                  m.image.includes(".mp4") || m.image.includes(".mp3") ? (
                    <video
                      width={"150px"}
                      height={"150px"}
                      autoPlay
                      controls
                      src={`https://chatback-api.onrender.com/${m.image}`}
                    ></video>
                  ) : (
                    <Image
                      src={`https://chatback-api.onrender.com/${m.image}`}
                      w={"150px"}
                      h={"150px"}
                    />
                  )
                ) : (
                  <Text
                    borderRadius="20px"
                    padding="5px 15px"
                    w="fit-content"
                    backgroundColor={`${
                      m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                    }`}
                  >
                    {m.content}
                  </Text>
                )}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
