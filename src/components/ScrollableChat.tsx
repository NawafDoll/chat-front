import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./ChatLogics";
import { ChatState } from "./context/ChatProvider";
import { Avatar, Box, Image, Text, Tooltip } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

function ScrollableChat({ messages }: any) {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m: any, i: any) => {
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
                    mt={"31px"}
                    mr={0}
                    size={"sm"}
                    name={m.sender.username}
                    src={m.sender.pic.url}
                  />
                </Tooltip>
              )}

              <span
                style={{
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user.id),
                  marginTop: isSameUser(messages, m, i) ? 3 : 10,
                }}
              >
                {m.image !== undefined ? (
                  m.image.url.includes(".mp4") ||
                  m.image.url.includes(".MP4") ||
                  m.image.url.includes(".mp3") ? (
                    <video
                      width={"130px"}
                      height={"130px"}
                      controls
                      src={m.image.url}
                    ></video>
                  ) : m.image.url.includes(".png") ||
                    m.image.url.includes(".jpeg") ||
                    m.image.url.includes(".jpg") ? (
                    <Image src={m.image.url} w={"130px"} h={"130px"} />
                  ) : (
                    <Box bg={"white"}>
                      <iframe
                        src={m.image.url}
                        scrolling="no"
                        style={{
                          overflow: "hidden",
                          width: "130px",
                          height: "130px",
                        }}
                      />
                      <a href={m.image.url} download target="_blank">
                        <DownloadIcon color={"blue.500"} />
                      </a>
                    </Box>
                  )
                ) : (
                  <Text
                    borderRadius={`${
                      m.sender._id === user.id
                        ? "20px 20px 0px 20px"
                        : "20px 20px 20px 0px"
                    }`}
                    padding="5px 15px"
                    w="fit-content"
                    boxShadow={"lg"}
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
